---
title: "SOW 프로젝트 소개와 시스템 아키텍처"
subtitle: "운빨 가차 랜덤 디펜스를 웨이브, 가차, 적 AI, GAS로 나누어 보기"
date: "2025-12-01"
---

# [SOW] 프로젝트 소개와 시스템 아키텍처

## 1. 프로젝트 소개

### 1.1 한 줄 소개

SOW는 Unreal Engine 5로 제작한 **운빨 가차 랜덤 디펜스** 프로젝트다. 플레이어는 제한된 자원으로 랜덤 터렛을 소환하고, 배치 가능한 타일 위에 터렛을 세우며, 웨이브마다 몰려오는 적이 Core Rune에 도달하기 전에 막아야 한다.

핵심 경험은 "뽑힌 결과를 어떻게 방어 전략으로 바꿀 것인가"에 있다. 좋은 터렛이 나오는 운도 중요하지만, 그 터렛을 어느 타일에 놓을지, 어떤 속성 시너지를 만들지, 다음 웨이브 전에 자원을 어디에 쓸지 판단해야 게임이 성립한다.

```text
웨이브 시작
-> 적 스폰
-> 적이 경로를 따라 Core Rune으로 진입
-> 터렛이 GAS 기반 공격과 효과로 적을 처치
-> 처치 보상으로 다음 가차와 배치를 준비
-> 막지 못한 적은 Core Rune에 피해를 입힘
```

이 글은 커밋 단위 개발일지라기보다, 포트폴리오에서 SOW를 처음 소개할 때 사용할 수 있는 전체 구조 설명이다. 특히 웨이브 시스템, 적 AI, Gameplay Ability System(GAS)이 어떻게 연결되어 운빨 가차 랜덤 디펜스의 플레이 루프를 만드는지에 집중했다.

### 1.2 플레이 목표

플레이어의 목표는 단순히 적을 모두 처치하는 것이 아니라, 랜덤성과 제한 조건을 관리하면서 Core Rune을 지키는 것이다.

1. 웨이브마다 적의 수, 종류, 스폰 타이밍이 달라진다.
2. 터렛은 가차를 통해 획득하며, 희귀도와 속성에 따라 전투 역할이 달라진다.
3. 배치 가능한 타일과 터렛 수 제한이 있어 무한히 방어선을 쌓을 수 없다.
4. 같은 속성 또는 특정 조건의 터렛 조합은 시너지 태그를 만들고, 이 태그가 GAS 효과와 UI 피드백으로 이어진다.
5. 적이 Core Rune에 도달하면 보상 없이 룬 체력이 감소하므로, 처치 성공과 방어 실패가 명확하게 갈린다.

### 1.3 포트폴리오에서 보여줄 핵심

SOW에서 보여주고 싶은 기술적 핵심은 세 가지다.

첫째, **웨이브와 적 AI를 데이터와 경로 시스템으로 분리한 점**이다. 웨이브 데이터는 어떤 적을 언제, 얼마나, 어느 스폰 지점에서 만들지를 정하고, 적 Actor는 생성된 뒤 가장 가까운 `AEnemyIncomingRoute`를 찾아 Behavior Tree로 이동한다.

둘째, **가차와 터렛 배치를 매니저 구조로 관리한 점**이다. `USummonManager`는 DataTable에서 터렛 풀을 만들고, `GachaRNG`는 희귀도 가중치와 균등 인덱스를 계산한다. 소환 결과는 `ATileBase` 상태와 연결되어 실제 방어 라인으로 변한다.

셋째, **GAS를 전투 규칙의 공통 언어로 사용한 점**이다. 플레이어, 터렛, 적, Core Rune은 모두 `ASOWCharacter` 계층을 통해 `USOWAbilitySystemComponent`와 `USOWAttributeSet`을 가진다. 덕분에 체력, 공격력, 공격 속도, 보호막, 속성 저항, GameplayTag를 한 흐름에서 다룰 수 있다.

## 2. 전체 시스템 아키텍처

![SOW 시스템 아키텍처](/images/sow/architecture/sow-system-architecture.svg)

SOW의 C++ 구조는 크게 여덟 영역으로 나눌 수 있다.

| 영역 | 대표 코드 | 역할 |
| :---: | --- | --- |
| 플레이어 / UI | `ASOWPlayerController`, HUD, Shop, Skill UI | 타일 선택, 소환 요청, 재화와 웨이브 상태 표시 |
| GameInstance 매니저 | `USOWGameInstance` | Skill, Currency, Summon, Synergy, Sound 매니저를 생성하고 공유 |
| 웨이브 진행 | `AWaveGameMode` | 스테이지 재화, 터렛 수 제한, Core Rune HUD 이벤트, 스테이지 종료 이벤트 관리 |
| 맵 / 타일 / 경로 | `SOWTileSpawner`, `ATileBase`, `AEnemyIncomingRoute` | 배치 가능 타일과 적 진입 spline route 제공 |
| 가차 / 터렛 | `GachaRNG`, `USummonManager`, `ASOWCharacterTurretBase` | 희귀도 기반 랜덤 소환과 타일 배치, 터렛 Actor 구성 |
| 적 AI | `ASOWCharacterEnemyBase`, `AEnemyBaseAIController`, `BTT_*` | 루트 추적, Blackboard 상태 전환, 근거리/원거리 공격 |
| GAS 전투 | `USOWAbilitySystemComponent`, `USOWAttributeSet`, `GameplayEffect` | 피해, 버프, 디버프, 능력치 변경, GameplayTag 처리 |
| 방어 목표 | `ASOWCharacterCoreRune` | 룬 체력과 보호막, 피격 HUD, 파괴 이벤트 관리 |

이 구조의 중심에는 `USOWGameInstance`와 `AWaveGameMode`가 있다. `USOWGameInstance`는 오래 살아야 하는 매니저를 생성하고, `AWaveGameMode`는 한 스테이지 안에서 바뀌는 값인 현재 재화, 배치된 터렛 수, Core Rune HUD 이벤트를 관리한다.

```cpp
void USOWGameInstance::Init()
{
    SkillManager = NewObject<UUSkillManager>(this);
    GlobalCurrencyManager = NewObject<UGlobalCurrencyManager>(this);
    OneTimeCurrencyManager = NewObject<UOneTimeCurrencyManager>(this);
    SummonManager = NewObject<USummonManager>(this);
    TurretSynergyManager = NewObject<UTurretSynergyManager>(this);
    SoundManager = USoundManager::Get(this);
}
```

이런 분리는 랜덤 디펜스 장르에 잘 맞는다. 소환, 재화, 시너지처럼 여러 UI와 Actor가 동시에 참조하는 시스템은 GameInstance 매니저로 두고, 웨이브 중에 계속 바뀌는 값은 GameMode가 책임진다. 덕분에 터렛, 적, UI가 서로를 직접 강하게 붙잡지 않고 Delegate와 Manager를 통해 느슨하게 연결된다.

## 3. 코드 구조

SOW의 주요 게임 코드는 `Source/SOW` 아래에 기능별로 나뉘어 있다.

```text
Source/SOW
├─ GameModes
│  └─ WaveGameMode
├─ Manager
│  ├─ SummonManager
│  ├─ TurretSynergyManager
│  ├─ GlobalCurrencyManager
│  └─ OneTimeCurrencyManager
├─ Characters
│  ├─ SOWCharacter
│  ├─ Enemies
│  ├─ Turrets
│  └─ CoreRune
├─ AbilitySystem
│  ├─ SOWAbilitySystemComponent
│  ├─ SOWAttributeSet
│  ├─ GameplayAbilities
│  └─ GEEC execution calculations
├─ Components
│  ├─ Enemies
│  ├─ UI
│  └─ Turret combat / skill / projectile components
├─ Tile
│  ├─ SOWTileSpawner
│  └─ TileBase
├─ Utilities
│  ├─ GachaRNG
│  └─ EnemyIncomingRoute
└─ Structures
   ├─ Waves
   └─ Enemies
```

기능별 디렉터리가 명확하기 때문에 포트폴리오에서는 "어떤 기능을 어디에 구현했는가"를 설명하기 좋다. 예를 들어 웨이브 설명은 `Structures/Waves`와 `GameModes`, 적 AI 설명은 `Characters/Enemies/AI`와 `Components/Enemies`, GAS 설명은 `AbilitySystem`과 각 Character의 `PossessedBy` 흐름을 따라가면 된다.

## 4. 웨이브와 적 진입 구조

![SOW 웨이브와 적 루트 처리 흐름](/images/sow/architecture/sow-wave-route-flow.svg)

웨이브 시스템은 DataTable 친화적인 구조체에서 시작한다. `FWaveInfo`는 웨이브 번호, 적 스폰 데이터 배열, 웨이브 사이 대기 시간, 웨이브 지속 시간을 가진다. 각 `FMonsterSpawnData`는 적 클래스, 수량, 스폰 시간, 스폰 지점 index를 가진다.

```cpp
USTRUCT(BlueprintType)
struct FMonsterSpawnData : public FTableRowBase
{
    TSubclassOf<ASOWCharacterEnemyBase> MonsterType;
    int32 MonsterCount;
    float SpawnTime;
    TArray<int32> SpawnPointIndices;
};

USTRUCT(BlueprintType)
struct FWaveInfo : public FTableRowBase
{
    int32 WaveNum;
    TArray<FMonsterSpawnData> MonsterSpawnData;
    float InterludeDuration;
    float WaveDuration;
};
```

이 구조를 사용하면 C++은 "웨이브를 어떻게 해석할지"만 알고, 실제 적 구성과 타이밍은 DataTable에서 바꿀 수 있다. 랜덤 디펜스에서는 후반 밸런싱이 매우 잦기 때문에, 적 수와 스폰 시간을 코드에 박아두지 않는 것이 중요했다.

적이 생성되면 `ASOWCharacterEnemyBase::BeginPlay`에서 적 타입에 맞는 능력치와 애니메이션 데이터를 읽고, 가장 가까운 진입 루트를 찾는다. 루트는 `SOWTileSpawner`가 가진 `AEnemyIncomingRoute` 배열에서 선택한다.

```cpp
TArray<AEnemyIncomingRoute*> AvailableRoutes =
    TileSpawner->GetSpawnedEnemyRoutes();

for (AEnemyIncomingRoute* Route : AvailableRoutes)
{
    FVector RouteStartLocation =
        Route->GetCurrentIncomingIndexPosition(0);

    float CurrentSquaredDistance =
        FVector::DistSquared(EnemyLocation, RouteStartLocation);
}
```

적의 실제 이동은 `UEnemyIncomingRouteComponent`와 Behavior Tree Task가 나눠서 처리한다. Route Component는 현재 spline point index를 기억하고, `BTT_MoveAlongRoute`는 그 위치를 향해 적을 회전시키고 전진시킨다.

```cpp
FVector TargetLocation =
    Enemy->GetEnemyIncomingRouteComponent()->GetCurrentIndexPosition();

if (FVector::Dist(TargetLocation, Enemy->GetActorLocation()) <= 5.f)
{
    Enemy->GetEnemyIncomingRouteComponent()->IncrementIncomingRouteIndex();
}

FVector DirectionVec =
    (TargetLocation - Enemy->GetActorLocation()).GetSafeNormal();

Enemy->SetActorRotation(FRotator(0.f, DirectionVec.Rotation().Yaw, 0.f));
Enemy->AddMovementInput(Enemy->GetActorForwardVector(), 1.f);
```

경로 끝에 도달하면 AI Controller는 상태를 `Attacking`으로 바꾼다. 이 상태 전환은 Behavior Tree가 다음 행동을 고를 수 있게 만드는 신호다.

```cpp
if (Enemy->GetEnemyIncomingRouteComponent()->HasReachedEnd())
{
    Enemy->GetAIController()->UpdateCurrentState(EEnemyStates::Attacking);
    return EBTNodeResult::Succeeded;
}
```

이렇게 적 이동을 Navigation 전체에만 맡기지 않고 route index 기반으로 직접 추적한 이유는, 랜덤 디펜스에서 적의 진입선이 플레이어에게 명확하게 보여야 하기 때문이다. 적이 어디서 오고 어디로 가는지 예측할 수 있어야, 플레이어가 타일 배치를 전략으로 받아들인다.

## 5. 적 AI와 Core Rune

`AEnemyBaseAIController`는 적을 Possess하면 Behavior Tree와 Blackboard를 초기화한다. 기본 공격 대상은 Core Rune이며, 현재 상태는 `FollowingIncomingRoute`로 시작한다.

```cpp
if (AActor* CoreRune =
    UGameplayStatics::GetActorOfClass(
        GetWorld(),
        ASOWCharacterCoreRune::StaticClass()))
{
    GetBlackboardComponent()->SetValueAsObject("AttackTarget", CoreRune);
}

UpdateCurrentState(EEnemyStates::FollowingIncomingRoute);
RunBehaviorTree(BehaviorTree);
```

Blackboard에는 공격 거리, 공격 속도, 목표 우선순위도 들어간다. 적 종류마다 DataTable에서 다른 값을 읽고, AI Controller가 이를 Blackboard에 기록하기 때문에 Behavior Tree는 같은 구조를 재사용하면서도 적마다 다른 행동을 만들 수 있다.

```cpp
GetBlackboardComponent()->SetValueAsFloat("AttackRadius", AttackRadius);
GetBlackboardComponent()->SetValueAsFloat("AttackSpeed", AttackSpeed);
GetBlackboardComponent()->SetValueAsEnum(
    "TargetPriority",
    static_cast<uint8>(TargetPriority)
);
```

적이 Core Rune에 가까운 상태에서 충돌하면, 처치 보상이 아니라 방어 실패로 처리된다. `ASOWCharacterEnemyBase::OnBeginOverlap`은 `ShardDropAmount = 0`으로 보상을 제거하고, DamageEffect를 Core Rune의 ASC에 적용한다.

```cpp
if (Cast<ASOWCharacterCoreRune>(OtherActor)
    && GetEnemyIncomingRouteComponent()->IsCloseToEnd(2))
{
    ShardDropAmount = 0;

    GetSOWAbilitySystemComponent()->ApplyGameplayEffectSpecToTarget(
        *GetSOWAbilitySystemComponent()
            ->MakeOutgoingSpec(DamageEffect, 1.f, EffectContext).Data.Get(),
        USOWBlueprintFunctionLibrary
            ::NativeGetSOWAbilitySystemComponentFromActorInfo(OtherActor)
    );

    BroadcastEnemyDeath();
}
```

이 처리는 장르적으로 중요하다. 적을 막지 못했는데 보상을 받으면, 실패가 오히려 자원 이득이 될 수 있다. SOW에서는 Core Rune에 도달한 적의 보상을 0으로 만들고, 룬 피해를 GAS 효과로 처리해 성공과 실패의 결과를 분리했다.

Core Rune 역시 `ASOWCharacter` 계층이므로 ASC와 AttributeSet을 가진다. 체력과 보호막 변화는 `AWaveGameMode`의 BlueprintImplementableEvent로 HUD에 전달된다.

```cpp
AbilitySystemComponent->GetGameplayAttributeValueChangeDelegate(
    USOWAttributeSet::GetCurrentHealthAttribute()
).AddUObject(this, &ASOWCharacterCoreRune::OnHealthChanged);

AbilitySystemComponent->GetGameplayAttributeValueChangeDelegate(
    USOWAttributeSet::GetDamageShieldAttribute()
).AddUObject(this, &ASOWCharacterCoreRune::OnShieldChanged);
```

## 6. 가차, 배치, 시너지

![SOW 가차, 터렛, GAS 전투 루프](/images/sow/architecture/sow-gacha-gas-flow.svg)

SOW가 운빨 가차 랜덤 디펜스가 되기 위해서는 랜덤 소환 결과가 실제 게임 오브젝트와 전투 규칙으로 이어져야 한다. 이 흐름은 `USummonManager`가 담당한다.

`FSummonData`는 터렛 이름, 희귀도, 공격 타입, 터렛 클래스, 프로필 이미지, 속성을 한 행에 담는다. `Initialize`에서는 DataTable을 읽어 희귀도별 배열을 만든다.

```cpp
switch (Row->Rarity)
{
case ERarity::Common:
    L_Common.AddUnique(*Row);
    break;
case ERarity::Rare:
    L_Rare.AddUnique(*Row);
    break;
case ERarity::Epic:
    L_Epic.AddUnique(*Row);
    break;
case ERarity::Legendary:
    L_Legendary.AddUnique(*Row);
    break;
case ERarity::Origin:
    L_Origin.AddUnique(*Row);
    break;
}
```

실제 랜덤은 `GachaRNG`에서 처리한다. `DrawWeightedIndex`는 희귀도 가중치 중 하나를 뽑고, `UniformIndex`는 선택된 희귀도 pool 안에서 터렛 index를 고른다. `UniformIndex`에서 rejection sampling을 사용해 modulo bias를 제거한 점도 눈에 띈다.

```cpp
const int32 RarityIdx = GachaRNG::DrawWeightedIndex(NewRarityWeights);

const TArray<FSummonData>* Pool = nullptr;
switch (RarityIdx)
{
case 0: Pool = &L_Common; break;
case 1: Pool = &L_Rare; break;
case 2: Pool = &L_Epic; break;
case 3: Pool = &L_Legendary; break;
case 4: Pool = &L_Origin; break;
}

const uint32 idx = GachaRNG::UniformIndex((uint32)Pool->Num());
return (*Pool)[(int32)idx];
```

소환 결과는 곧바로 타일 배치로 이어진다. `TurretSummon`은 플레이어 컨트롤러의 타일 목록을 순회해 `Available` 타일을 찾고, 해당 위치에 터렛을 Spawn한 뒤 타일 상태를 `Occupied`로 바꾼다.

```cpp
if (CT->TileState == ETileSummonState::Available)
{
    ASOWCharacterTurretBase* NewTurret =
        GetWorld()->SpawnActor<ASOWCharacterTurretBase>(
            TurretToSummon.TurretClass,
            SpawnLoc,
            SpawnRotator,
            Params
        );

    CT->TileState = ETileSummonState::Occupied;
    OnSummonTurret.Broadcast(TurretToSummon);
}
```

터렛은 `ASOWCharacterTurretBase`에서 Combat, Evolution, Skill, Projectile Pooling, UI Component를 가진다. 터렛이 Possess되면 ASC Attribute 변화와 GameplayTag 변화를 UI delegate에 연결한다.

```cpp
ASC->GetGameplayAttributeValueChangeDelegate(
    AttributeSet->GetDetectionRangeAttribute()
).AddUObject(this, &ASOWCharacterTurretBase::OnDetectionRangeChanged);

ASC->RegisterGameplayTagEvent(
    FGameplayTag::RequestGameplayTag(TEXT("Turret.Status.Buff")),
    EGameplayTagEventType::AnyCountChange
).AddUObject(this, &ASOWCharacterTurretBase::OnGameplayTagChanged);
```

시너지는 `UTurretSynergyManager`가 관리한다. 이 매니저는 속성별 터렛 목록, 희귀도 카운트, 활성화된 GameplayTag, 터렛 타입 구성을 따로 기록한다.

```cpp
TMap<EElementalType, TArray<TWeakObjectPtr<ASOWCharacterTurretBase>>> SynergyMonitor;
TMap<EElementalType, TMap<ETurretRarity, int>> SynergyRarityMonitor;
TMap<EElementalType, FGameplayTagContainer> SynergyTagContainer;
TMap<EElementalType, TMap<FName, int>> SynergyTypeMonitor;
```

새 터렛이 배치되면 `AddNewTurretDataForSynergy`가 속성별 monitor를 갱신하고, 조건을 만족하는 태그를 ASC에 부여한다. 제거될 때는 반대로 태그를 제거한다. 이 구조 덕분에 시너지는 UI 문구만 바꾸는 장식이 아니라, GameplayTag를 통해 실제 능력과 효과에 영향을 줄 수 있는 시스템이 된다.

## 7. GAS 전투 구조

SOW의 모든 주요 전투 Actor는 `ASOWCharacter`를 기반으로 한다. 생성자에서 `USOWAbilitySystemComponent`와 `USOWAttributeSet`을 만들고, Possess 시점에 ASC ActorInfo와 StartupData를 초기화한다.

```cpp
ASOWCharacter::ASOWCharacter()
{
    AbilitySystemComponent =
        CreateDefaultSubobject<USOWAbilitySystemComponent>(
            TEXT("SOWAbilitySystemComponent")
        );

    AttributeSet =
        CreateDefaultSubobject<USOWAttributeSet>(
            TEXT("SOWAttributeSet")
        );
}

void ASOWCharacter::PossessedBy(AController* NewController)
{
    AbilitySystemComponent->InitAbilityActorInfo(this, this);
    AbilitySystemComponent->AddAttributeSetSubobject(AttributeSet);
    InitFromDataAsset();
}
```

`USOWAttributeSet`은 체력, 공격력, 방어력, 공격 속도, 이동 속도, 사거리, 보호막, 속성 저항을 가진다. 따라서 적, 터렛, Core Rune이 서로 다른 역할을 하더라도 전투 계산은 같은 속성 언어로 처리된다.

```cpp
FGameplayAttributeData MaxHealthBase;
FGameplayAttributeData CurrentHealth;
FGameplayAttributeData DamageShield;
FGameplayAttributeData AttackPowerBase;
FGameplayAttributeData DetectionRange;
FGameplayAttributeData AttackSpeedBase;
FGameplayAttributeData WalkSpeed;
FGameplayAttributeData FlameResistance;
FGameplayAttributeData IceResistance;
```

`USOWAbilitySystemComponent`는 GameplayTag로 Ability를 실행할 수 있는 헬퍼를 제공한다. 터렛이나 스킬 UI는 특정 Ability 클래스를 직접 강하게 참조하지 않고, 태그 기반 실행 흐름을 사용할 수 있다.

```cpp
UCLASS()
class USOWAbilitySystemComponent : public UAbilitySystemComponent
{
public:
    bool TryActivateAbilityWithTag(FGameplayTag InAbilityTag);

    void OnAbilityInputPressed(FGameplayTag InInputTag);
    void OnAbilityInputReleased(FGameplayTag InInputTag);
};
```

적 AI의 공격도 GAS와 만난다. 원거리 공격 Task는 Blackboard에서 `AttackTarget`을 읽고, 대상이 Player, Turret, Core Rune 중 하나인지 확인한 뒤 `UGA_Enemy_RangedAttack`을 ASC에서 활성화한다.

```cpp
bool bActivated =
    ASC->TryActivateAbilityByClass(UGA_Enemy_RangedAttack::StaticClass());
```

이 구조의 장점은 전투 규칙이 특정 Actor의 일회성 함수에 흩어지지 않는다는 점이다. 적이 공격하든, 터렛이 공격하든, Core Rune이 피해를 받든 결국 AttributeSet과 GameplayEffect를 통해 상태 변화가 일어난다. 포트폴리오 관점에서는 UE5 GAS를 단순 예제가 아니라 실제 게임 루프에 연결한 사례로 설명할 수 있다.

## 8. 시스템 간 상호작용 정리

SOW의 플레이 한 사이클은 다음처럼 연결된다.

1. `AWaveGameMode`가 현재 재화와 터렛 수 제한을 관리한다.
2. 플레이어가 UI에서 소환을 요청하면 `USummonManager`가 `GachaRNG`와 DataTable pool을 통해 `FSummonData`를 선택한다.
3. 선택된 터렛 클래스가 `ATileBase` 위에 Spawn되고, 타일 상태는 `Occupied`가 된다.
4. 터렛은 `ASOWCharacter` 기반 ASC와 AttributeSet을 초기화하고, Combat / Skill / UI Component를 통해 공격과 피드백을 수행한다.
5. `UTurretSynergyManager`가 배치된 터렛의 속성과 희귀도 조건을 계산해 GameplayTag를 부여한다.
6. 웨이브 데이터는 적 종류와 스폰 타이밍을 제공하고, 적은 가장 가까운 `AEnemyIncomingRoute`를 찾아 이동한다.
7. 적 AI는 Blackboard의 `State`, `AttackTarget`, `AttackRadius`, `AttackSpeed`를 기준으로 이동과 공격 Task를 실행한다.
8. 터렛에게 처치된 적은 `OnEnemyDeath`를 방송하고 보상을 만든다.
9. Core Rune에 도달한 적은 보상 없이 DamageEffect를 적용하고, Core Rune HUD와 파괴 이벤트를 갱신한다.

이 흐름에서 중요한 점은 "가차", "웨이브", "AI", "GAS"가 따로 존재하지 않는다는 것이다. 가차는 터렛 Actor를 만들고, 터렛은 GAS Attribute와 Ability로 공격하며, 적 AI는 route를 따라 진입하고, 적 사망 또는 Core Rune 피해는 다시 재화와 승패 흐름으로 돌아간다. 각각은 분리되어 있지만 플레이 루프에서는 하나의 순환 구조를 만든다.

## 9. 구조적 특징

### 9.1 DataTable 기반 튜닝

웨이브 구성, 터렛 소환 pool, 적 능력치, 시너지 조건은 코드보다 데이터로 관리된다. 운빨 가차 랜덤 디펜스는 밸런싱이 잦은 장르이므로, 스폰 수, 스폰 시간, 희귀도 pool, 적 체력, 보상량을 에디터에서 조절할 수 있는 구조가 중요했다.

### 9.2 Manager와 Delegate 중심 연결

`USOWGameInstance`는 여러 매니저의 루트가 되고, 각 매니저는 Delegate로 UI와 Actor에 변경 사항을 알린다. 예를 들어 `USummonManager`는 `OnSummonTurret`을 방송하고, `AWaveGameMode`는 `OnOneTimeCurrencyChanged`와 `OnTurretsNumChanged`를 방송한다. 이 덕분에 UI와 게임 로직이 서로의 내부 구현을 직접 알 필요가 줄어든다.

### 9.3 Route 기반 적 AI

적은 매 프레임 무작정 Core Rune을 향해 직선 이동하지 않는다. `AEnemyIncomingRoute`의 spline point를 따라가며, Behavior Tree와 Blackboard 상태로 이동과 공격을 분리한다. 이 구조는 디펜스 게임에서 중요한 "예측 가능한 적 진입선"을 만든다.

### 9.4 GAS 기반 전투 공통화

터렛, 적, Core Rune이 같은 ASC / AttributeSet 기반 위에 있기 때문에 체력 변화, 이동 속도 변화, 공격 속도 변화, 보호막, 속성 저항, GameplayTag를 한 방식으로 다룰 수 있다. 특히 시너지 시스템이 GameplayTag를 부여하고 제거하는 방식은 GAS와 자연스럽게 연결된다.

### 9.5 Blueprint와 C++의 역할 분리

C++은 매니저, 구조체, AI Task, ASC 초기화, Attribute 변경, Delegate 같은 핵심 규칙을 담당한다. UI 표시, HUD 업데이트, 시각 효과, 일부 이벤트 반응은 BlueprintImplementableEvent나 Widget을 통해 확장된다. 이 방식은 팀 프로젝트에서 디자이너 친화적인 조정과 C++ 규칙의 안정성을 함께 가져갈 수 있다.

## 10. 포트폴리오용 요약

SOW는 단순한 타워 디펜스가 아니라, 랜덤 가차 결과를 타일 배치와 시너지, GAS 전투 규칙으로 해석하는 운빨 가차 랜덤 디펜스 프로젝트다. 이 프로젝트에서 핵심적으로 설명할 수 있는 작업은 다음과 같다.

1. `FWaveInfo`와 `FMonsterSpawnData`를 사용해 웨이브를 데이터 기반으로 구성했다.
2. `AEnemyIncomingRoute`, `UEnemyIncomingRouteComponent`, Behavior Tree Task를 연결해 적이 명확한 진입 경로를 따라 움직이도록 했다.
3. `USummonManager`와 `GachaRNG`를 통해 희귀도 기반 랜덤 터렛 소환을 구현했다.
4. `ASOWCharacter` 기반으로 터렛, 적, Core Rune이 같은 ASC와 AttributeSet을 사용하게 만들었다.
5. `UTurretSynergyManager`가 속성, 희귀도, 터렛 조합을 감시하고 GameplayTag를 통해 GAS 효과와 연결될 수 있도록 설계했다.
6. 적 처치 보상과 Core Rune 도달 실패를 분리해, 방어 성공과 실패가 게임 경제에서 다른 결과를 만들도록 했다.

결과적으로 SOW의 시스템 아키텍처는 "랜덤으로 뽑고, 제한된 타일에 배치하고, 웨이브를 막고, GAS로 전투 결과를 계산하는" 루프를 중심으로 설계되어 있다. 포트폴리오에서는 이 흐름을 통해 UE5의 Behavior Tree와 GAS를 실제 게임 장르의 요구에 맞게 연결한 경험을 보여줄 수 있다.
