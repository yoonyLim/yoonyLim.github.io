---
title: "SuraS 프로젝트 소개와 시스템 아키텍처"
subtitle: "Hyper FPS를 움직임, 무기, 적 AI, 전투 시스템으로 나누어 보기"
date: "2025-12-01"
---

# [SuraS] 프로젝트 소개와 시스템 아키텍처

## 1. 프로젝트 소개

### 1.1 한 줄 소개

SuraS는 Unreal Engine 5로 제작한 1인칭 Hyper FPS 프로젝트다. 플레이어는 벽을 타고, 무너진 도시를 날아다니며, 빠른 이동과 사격을 결합해 미지의 적을 섬멸한다. 핵심은 단순히 총을 잘 쏘는 것이 아니라, 움직임 자체가 무기이자 생존 전략이 되는 전투 경험을 만드는 것이다.

프로젝트의 최종 포트폴리오 소개에서는 다음 네 가지를 핵심 축으로 잡았다.

1. 자체 구현 Pawn Movement
2. 정밀한 Wall Running
3. 지형 반응형 Mantling
4. 상태 기반 기동 알고리즘

여기에 협동하는 적 AI, Navigation Link 기반 입체 경로 탐색, 물리 기반 신체 절단, Behavior Tree 최적화가 결합되어 SuraS의 전투 밀도를 만든다.

### 1.2 기획의 변화

초기 발표 자료에서 SuraS의 원형은 3인칭 숄더뷰 무협 프리플로우 액션에 가까웠다. 당시 기획의 중심은 주변 환경과 적의 위치, 방향을 실시간으로 계산해 단순한 공격 입력만으로도 다양한 공격 연출을 만드는 전투 방식이었다. 이를 위해 적 타겟팅 시스템, 공격 모션 시스템, 적 커맨더 시스템, 클러스터 시스템이 필수 요소로 정리되었다.

이후 프로젝트는 1인칭 Hyper FPS로 재정렬되었다. 하지만 초기 기획에서 중요하게 보았던 "상황을 계산해 액션을 자연스럽게 연결한다"는 생각은 그대로 남았다. 현재 코드에서는 그것이 플레이어의 커스텀 Pawn Movement, 무기 상태 머신, 적 AI의 Behavior Tree, 공격 토큰, Motion Warping 기반 협동 공격으로 구현되어 있다.

### 1.3 플레이 경험 목표

SuraS의 플레이 경험은 다음 문장으로 요약할 수 있다.

> 플레이어는 지형을 빠르게 읽고, 벽 주행과 맨틀링으로 전장을 입체적으로 이동하며, 다수의 적 AI가 만들어내는 압박 속에서 사격과 기동을 동시에 판단한다.

따라서 시스템 설계도 캐릭터 하나에 모든 로직을 몰아넣는 방식이 아니라, 각 책임을 ActorComponent, State 클래스, Behavior Tree Task, DataTable, Delegate로 나누는 방향을 사용했다.

## 2. 전체 시스템 아키텍처

![SuraS 시스템 아키텍처](/images/suras/architecture/suras-system-architecture.svg)

SuraS의 C++ 구조는 크게 여섯 계층으로 나눌 수 있다.

| 계층 | 대표 코드 | 역할 |
| :---: | --- | --- |
| 플레이어 Pawn | `ASuraPawnPlayer` | Capsule, Camera, Arm Mesh, Movement, Weapon, Damage, UI Component를 조립하는 중심 Actor |
| 이동 시스템 | `USuraPlayerMovementComponent` | 자체 Pawn Movement, WallRun, Slide, Mantle, Dash, Airborne 상태 처리 |
| 무기 시스템 | `UWeaponSystemComponent`, `SuraWeapon*State` | 무기 획득, 교체, 조준, 발사, 장전, 차징 상태 관리 |
| 적 AI | `AEnemyBaseAIController`, `BTT_*`, `BTS_*` | AI Perception, Blackboard, Behavior Tree 기반 상태 전환 |
| 전투/데미지 | `UACDamageSystem`, `UACEnemyDamageSystem`, `FDamageData` | 체력, 피격, 사망, 부위 파괴, Delegate 이벤트 처리 |
| 게임 흐름/UI | `SuraLevelGameMode`, `USuraCheckpointSubsystem`, `UACUIMangerComponent` | 체크포인트, 세이브, HUD, 킬 로그, 피격 화면 연결 |

이 구조의 핵심은 `ASuraPawnPlayer`와 `ASuraCharacterEnemyBase`가 모든 기능을 직접 구현하지 않는다는 점이다. 두 Actor는 필요한 Component를 조립하고, 각 Component는 자기 책임만 수행한다.

## 3. 플레이어 계층

### 3.1 ASuraPawnPlayer

`ASuraPawnPlayer`는 SuraS의 1인칭 플레이 경험을 구성하는 루트 Actor다. 기본 `ACharacter`의 Character Movement를 사용하는 대신 `APawn` 기반으로 직접 Capsule과 Camera, MovementComponent를 구성한다.

주요 구성 요소는 다음과 같다.

```text
ASuraPawnPlayer
├─ UCapsuleComponent
├─ UCameraComponent
├─ USuraPlayerMovementComponent
├─ USuraPlayerCameraComponent
├─ UWeaponSystemComponent
├─ UACDamageSystem
├─ UACPlayerAttackTokens
├─ UACUIMangerComponent
└─ UACHitScreenManager
```

이 구조 덕분에 플레이어 이동, 무기, 데미지, UI, 적 공격 토큰이 서로 독립적인 모듈로 관리된다. 예를 들어 적 AI는 플레이어 전체를 직접 조작하지 않고 `UACPlayerAttackTokens`를 통해 추격/공격 가능 여부만 예약한다. UI는 플레이어의 전투 로직을 직접 판단하지 않고 DamageSystem과 Movement Delegate를 받아 화면 피드백을 처리한다.

### 3.2 자체 Pawn Movement

`USuraPlayerMovementComponent`는 SuraS의 가장 중요한 기반 시스템이다. 현재 이동 상태는 `EMovementState`로 관리된다.

```cpp
UENUM(BlueprintType)
enum class EMovementState : uint8
{
    EMS_Move,
    EMS_Slide,
    EMS_Airborne,
    EMS_WallRun,
    EMS_Mantle,
    EMS_Downed,
    EMS_Dead,
};
```

매 Tick마다 입력을 캐싱하고, 현재 상태에 따라 `TickMove`, `TickSlide`, `TickAirborne`, `TickWallRun`, `TickMantle`처럼 분리된 로직을 실행한다. 이동 수치는 DataTable에서 읽어오므로 Dash 속도, WallRun 지속시간, Mantle 보정, Slide 추가 속도 등을 블루프린트/데이터 기반으로 조정할 수 있다.

이동 상태 변화는 Delegate를 통해 외부 시스템으로 전달된다. 예를 들어 WallRun이 시작되면 사운드, 카메라 틸트, 이펙트가 함께 반응하고, Dash가 발생하면 방향별 Niagara 이펙트를 켤 수 있다.

## 4. 무기 시스템

무기 시스템은 `UWeaponSystemComponent`가 중심이다. 이 Component는 플레이어 입력을 받아 무기 획득, 교체, 조준, 발사, 장전, 스킬 무기 장착을 처리한다.

무기 자체는 State Pattern에 가깝게 구성되어 있다.

```text
SuraWeaponBaseState
├─ SuraWeaponIdleState
├─ SuraWeaponFiringState
├─ SuraWeaponReloadingState
├─ SuraWeaponPumpActionReloadState
├─ SuraWeaponSwitchingState
├─ SuraWeaponTargetingState
├─ SuraWeaponChargingState
└─ SuraWeaponWaitingState
```

이 구조를 사용하면 "현재 무기가 발사 가능한가", "장전 중인가", "차징 중인가", "교체 중인가"를 하나의 거대한 조건문으로 처리하지 않아도 된다. 각 상태 클래스가 해당 상태의 입력과 종료 조건을 다루고, WeaponSystemComponent는 현재 무기와 인벤토리, 저장 데이터, UI Delegate를 관리한다.

## 5. 적 AI 계층

![SuraS 적 AI 상태 흐름](/images/suras/architecture/suras-enemy-ai-flow.svg)

### 5.1 AI Controller와 Blackboard

적은 `ASuraCharacterEnemyBase`와 `AEnemyBaseAIController`의 조합으로 동작한다. 적이 Possess되면 AI Controller는 적이 가진 Behavior Tree를 실행하고, DataTable에서 읽은 시야, 공격 거리, 공격 속도, Strafe 반경을 Blackboard에 초기화한다.

AI Controller는 AI Perception으로 플레이어를 감지하면 상태를 바꾼다. 이때 모든 적이 동시에 플레이어에게 달려들지 않도록 `UACPlayerAttackTokens`에서 Pursuit Token을 예약한다.

```text
플레이어 감지
→ AttackTarget Blackboard 갱신
→ Pursuit Token 예약 시도
→ 성공: Pursue 상태
→ 실패: Chase 상태
```

이 토큰 구조는 초기 기획의 "적 커맨더 시스템"과 비슷한 목적을 실제 코드에서 더 가볍게 구현한 형태라고 볼 수 있다. 별도의 중앙 Commander Actor가 모든 적을 직접 명령하는 구조는 아니지만, 플레이어 주변에서 몇 마리의 적이 추격하거나 공격할 수 있는지는 플레이어의 Token Component가 조절한다.

### 5.2 Behavior Tree Task

Behavior Tree Task는 적의 실제 행동을 잘게 나누어 실행한다. 대표적으로 다음 Task들이 있다.

| Task | 역할 |
| :---: | --- |
| `BTT_Patrol` | 순찰 경로 이동 |
| `BTT_MoveToTarget` | Blackboard Target 위치로 이동 |
| `BTT_FindPursuitPoint` | 플레이어 주변 추격 위치 계산 |
| `BTT_Strafe` | 공격 전후 좌우 이동 |
| `BTT_CheckAttackTokens` | 공격 가능 토큰 예약 |
| `BTT_MeleeAttack` | 근접 공격 몽타주 실행 |
| `BTT_Fire` | 원거리 발사 |
| `BTT_Climb` | 벽 등반 실행 |
| `BTT_TraverseNavLink` | Navigation Link를 통한 특수 이동 |
| `BTT_CoopAttack` | 동료를 잡고 던지는 협동 공격 |

이 구조는 적 행동을 "상태 전환"과 "행동 실행"으로 분리한다. AI Controller는 상태와 Blackboard 값을 관리하고, Task는 해당 상태에서 실제로 해야 하는 행동만 수행한다.

### 5.3 협동 공격과 Motion Warping

협동 공격은 SuraS 적 AI의 특징적인 부분이다. 한 적이 동료를 `CoopAlly`로 지정하고, 다른 적은 `CoopAttacking` 상태로 들어간다. 이후 `BTT_CoopAttack`에서 Motion Warping Target을 갱신해 던지는 적과 던져지는 적, 플레이어 방향을 맞춘다.

```text
던지는 적
→ CoopAlly Blackboard 지정
→ MotionWarping Target: EnemyAllyToGrab
→ MotionWarping Target: AttackTargetToFace
→ 몽타주 종료 시 Coop 상태 정리
```

즉, 협동 공격은 단순히 다른 적을 Launch하는 기능이 아니라, Behavior Tree 상태, Blackboard, Motion Warping, 애니메이션 몽타주가 함께 맞물리는 기능이다.

## 6. 전투와 데미지 이벤트

![SuraS 전투 이벤트 흐름](/images/suras/architecture/suras-combat-event-flow.svg)

SuraS의 데미지 흐름은 `FDamageData`를 중심으로 표준화된다. 무기나 투사체는 피격 지점, 피격 Bone, 데미지량, 충격 방향을 `FDamageData`로 묶어 `IDamageable` 대상에게 전달한다.

`UACDamageSystem`은 공통 체력 로직을 담당한다.

1. 이미 죽었거나 무적이면 데미지를 무시한다.
2. 체력을 감소시키고 0 이하이면 `OnDeath`를 Broadcast한다.
3. 피격 시 `OnDamaged`와 `OnHealthChanged`를 Broadcast한다.
4. 살아남았다면 체력 재생 Timer를 다시 시작한다.

적은 이를 확장한 `UACEnemyDamageSystem`을 사용한다. 이 Component는 BoneName을 기준으로 머리, 팔, 다리 같은 부위 체력을 따로 줄이고, 부위 체력이 0이 되면 해당 Bone을 숨기고 분리 파츠를 생성한다. 이때 Niagara 혈흔, 물리 Impulse, Dissolve 같은 피드백이 함께 실행된다.

## 7. UI와 게임 흐름

UI는 `UACUIMangerComponent`를 중심으로 HUD, Kill Log, Inventory, Crosshair, Hit Screen 같은 하위 Manager로 분리되어 있다. 적이 죽으면 DamageSystem의 `OnDeath` 이벤트가 발생하고, 적 캐릭터는 플레이어의 UIManager를 통해 Kill Log를 갱신한다.

게임 진행은 `SuraLevelGameMode`와 `USuraCheckpointSubsystem`이 맡는다. 플레이어가 체크포인트를 저장하면 `USuraSaveGame`에 현재 맵, 위치, 무기 보유 상태 같은 정보를 기록하고, 레벨 재진입 시 마지막 체크포인트로 복귀할 수 있다.

이 구조는 전투 시스템과 저장/진행 시스템을 직접 묶지 않는다. WeaponSystem은 무기 보유 상태를 저장 계층과 동기화하고, GameMode는 레벨 흐름과 리스폰 위치를 관리한다.

## 8. 구조적 특징 정리

### 8.1 Component 기반 분리

플레이어와 적 Actor는 많은 Component를 소유하지만, 각 기능은 독립 Component가 맡는다. 이동, 무기, 데미지, UI, 공격 토큰이 분리되어 있어 기능별 디버깅이 가능하다.

### 8.2 상태 기반 설계

플레이어 이동은 `EMovementState`, 무기는 `SuraWeapon*State`, 적 AI는 Blackboard의 `EEnemyStates`로 관리된다. 액션 게임은 순간적인 전환이 많기 때문에, 상태를 명시적으로 두는 구조가 디버깅과 확장에 유리했다.

### 8.3 DataTable 기반 튜닝

플레이어 이동 수치, 적 능력치, 무기 소유 정보는 DataTable과 DataAsset을 통해 조정된다. 코드에서는 구조와 흐름을 고정하고, 실제 수치는 에디터에서 반복 조정할 수 있게 만들었다.

### 8.4 Delegate 기반 피드백

DamageSystem, MovementComponent, WeaponSystem은 Delegate를 통해 외부 시스템에 이벤트를 알린다. 이 방식 덕분에 체력바, 킬 로그, 피격 화면, 사운드, 이펙트가 핵심 전투 로직에 강하게 결합되지 않는다.

## 9. 포트폴리오용 요약

SuraS에서 보여주고 싶은 기술적 핵심은 세 가지다.

1. UE5 기본 Character Movement에 의존하지 않고, 1인칭 Hyper FPS에 맞춘 자체 Pawn Movement를 구현했다.
2. Behavior Tree, Blackboard, AI Perception, Attack Token, Motion Warping을 연결해 다수의 적이 조직적으로 플레이어를 압박하도록 설계했다.
3. Damage Component와 FDamageData를 중심으로 피격, 사망, 부위 파괴, UI 피드백을 이벤트 기반으로 연결했다.

결과적으로 SuraS는 "빠르게 움직이며 쏘는 FPS"에서 한 단계 더 나아가, 이동 시스템과 적 AI가 서로를 밀어 올리는 액션 게임 구조를 목표로 한 프로젝트라고 정리할 수 있다.
