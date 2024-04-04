---
title: "Machine Learning 정리 노트 5"
subtitle: "Subspaces, Bases, and Projectiles in Machine Learning"
date: "2024-03-26"
use-math: true
---

# [Machine Learning 정리 노트 5] Subspaces, Bases, and Projectiles in Machine Learning

## 1. 개요

해당 정리 노트는 경희대학교 이원희 교수님의 "기계학습" 강의를 정리한 노트이다. 기계 학습의 개념은 선형대수에 대한 이해로 시작된다. 따라서 강의 내용을 본인이 이해한 내용을 바탕으로 선형대수의 개념을 풀어 설명하고자 한다.

## 2. 정리 내용

### 2.1 용어 정리

- 투영(projection): 한 벡터를 다른 벡터 위로 옮겨 표현하는 것
- 투영 벡터(projection vector): 한 벡터를 다른 벡터에 투영시켜 생성되는 벡터
- 투영 행렬(projection matrix): 한 벡터를 다른 벡터 공간에 투영시키는 행렬

### 2.2 정규 직교 기저(Orthonormal Basis)

부분 공간 $\mathcal{S}$에 속하는 두 벡터 $\underline{x}$와 $\underline{y}$가 있다고 하자. 이때 해당 벡터의 상수배 합은 당연하게도 $\alpha \underline{x} + \beta \underline{y} \in \mathcal{S}$처럼 원래 부분 공간에 속한다. 그렇다면 특성 행렬 $X$를 다른 두 행렬 $U$와 $V$의 곱으로 표현이 가능하다고 하다. 이때 $U$나 $V$가 직교 행렬이여서 특성 행렬 $X$를 직교 행렬로 다시 표현 가능하다면 원래의 특성을 유지하면서도 차원을 줄일 수 있다는 의미가 된다.

그렇다면 정규 행렬에 대한 특징을 살펴보자. 정규 행렬은 정규 직교 벡터들로 이루어진 행렬로 각 벡터들은 서로에 대해 수직이며 각 벡터의 크기인 $L^2$ norm은 모두 1이 된다. 즉, 두 정규 직교 벡터 $\underline{u_1}$과 $\underline{u_2}$에 대해 수식으로 나타내면 다음과 같은 성질이 성립한다.

$$ \langle \underline{u_1}, \underline{u_2}  \rangle = \underline{u_1} \cdot \underline{u_2} = \underline{u_1}^T \underline{u_2} = 0 $$
$$ \lVert \underline{u_1} \rVert_2 = 1 $$

### 2.3 투영(Projection)

