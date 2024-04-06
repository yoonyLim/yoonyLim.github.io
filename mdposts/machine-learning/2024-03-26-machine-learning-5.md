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
$$ \lVert \underline{u_1} \rVert_2 = ( \underline{u}^T \underline{u} )^{\frac{1}{2}} = 1 $$

이 성질들을 사용하면 정규 직규 벡터 $\underline{u_i}$들로만 이루어진 직교 행렬 $U$와 $U^T U$인 행렬 $C$에 대해 다음이 성립한다.

$$ U = \begin{bmatrix} \vdots &  \vdots & & \vdots \\\\ \underline{u_1} & \underline{u_2} & \dots & \underline{u_p} \\\\ \vdots &  \vdots & & \vdots \end{bmatrix}$$일 때,
$$ U^T U = C \rightarrow C_{ij} = \langle \underline{u_i}, \underline{u_j} \rangle $$
$$ C = \begin{bmatrix} 1 & 0 & \dots & 0 \\\\ 0 & 1 & \dots & 0 \\\\ \vdots & \vdots & \ddots & \vdots \\\\ 0 & 0 & \dots & 1 \end{bmatrix} \qquad \because \langle \underline{u_i}, \underline{u_j} \rangle = 1 \quad \text{if} \quad i = j, \langle \underline{u_i}, \quad \underline{u_j} \rangle = 0 \quad \text{if} \quad i \neq j $$

즉, $U^T U$인 행렬 $C$은 항상 단위 행렬(identity matrix)이 된다. 그렇다면 앞선 내용을 바탕으로 특성 행렬 $X \in \mathbb{R}^{n \times p}$이 직교 행렬인 $U \in \mathbb{R}^{n \times r}$와 가중치 행렬 $V \in \mathbb{R}^{r \times p}$의 곱인 $X = UV$로 나타낼 수 있다면 행렬 $X$의 열벡터들은 행렬 $U$의 열벡터들의 부분 공간에 속하기 때문에 특성이 유지되면서도 차원을 줄일 방법이 됨을 의미한다.

이때 부분 공간을 정규 직교 벡터들로 나타내는 방법은 아래 단계들을 따른다:

1. 부분 공간 $\mathcal{S}$를 벡터들의 $span$으로 나타낸다.
2. 부분 공간 $\mathcal{S}$를 다시 선형 독립인 벡터들, 즉 기저로 표현한다. 이때 선형 독립인 벡터들의 내적은 0이므로 직교성은 충족한다.
3. 해당 기저가 되는 벡터들을 정규화하여(크기를 1로 만들어) 정규 직교 벡터들로 만든다.

### 2.3 투영(Projection)

[이전 포스트](https://yoonylim.github.io/posts/machine-learning/2024-03-14-machine-learning-2)에서 서술했듯 기하학적 관점으로 보았을 때 투영을 통한 잔차의 최소화가 중요함을 우리는 이미 알고 있다. 그렇다면 투영을 선형대수적으로 표현하여 새롭게 차원축소된 normal equation을 이끌어내고자 한다.

![img1](/images/machine-learning/20240314/img1.png)

위 사진을 보고 이끌어냈듯 $\underline{\hat{w}} = (X^T X)^{-1} X^T \underline{y}$이며 $\underline{\hat{y}} = X \underline{\hat{w}}$이기 때문에 대입하면 $\underline{\hat{y}} = X(X^T X)^{-1} X^T \underline{y}$임을 알 수 있다. 그리고 이는 행렬 $X$의 부분 공간을 $\mathcal{X}$라 할 때, 위 사진에서 보이듯 $\underline{\hat{y}}$은 실제 레이블 벡터 $\underline{y}$의 $\mathcal{X}$ 위로의 투영 벡터이므로 $\underline{\hat{y}} = X(X^T X)^{-1} X^T \underline{y} = \text{Proj}_\mathcal{X} \underline{y}$이다. 이 때문에 $X(X^T X)^{-1} X^T$는 투영 행렬(projection matrix)이라 불린다.

그리고 위에서 말했듯 행렬 $X$의 열벡터들로 이루어진 부분 공간은 $U$의 열벡터들로 이루어진 부분 공간으로 표현이 가능하므로 아래와 같은 그림을 그릴 수 있다.

![img0](/images/machine-learning/20240326/img0.png)

이에 따라 $w_1 \underline{x_1} + w_2 \underline{x_2} = \tilde{w_1} \underline{u_1} + \tilde{w_2} \underline{u_2}$로 표현이 가능하다. 그렇다면 원래 구했던 가중치 벡터 $\underline{\hat{w}} = (X^T X)^{-1} X^T \underline{y}$를 변형하여 새로운 가중치 벡터인 $\tilde{\underline{w}}$에 대해 $\underline{\tilde{w}} = \underset{\underline{w}}{\text{argmin}} \lVert \underline{y} - U \underline{w} \rVert^2 = (U^T U)^{-1} U^T \underline{y}$로 표현이 가능하다. 즉, 다음과 같이 예측 레이블 벡터를 구할 수 있다.

$$ \underline{\hat{y}} = X (X^T X)^{-1} X^T \underline{y} = U (U^T U)^{-1} U^T \underline{y} $$

이때 $U^T U = I$이므로 $\underline{\hat{y}} = U (I)^{-1} U^T \underline{y} = U U^T \underline{y}$로 표현이 가능하며 더 적은 연산으로 예측 레이블 계산이 가능해졌다!

***주의: $U^T U = I$인 것은 자명하나, $U U^T$는 직교 행렬 $U$가 정방행렬일 때에만 단위 행렬 $I$ 값이 나온다.***

### 2.4 직교 행렬 사용 시 장점

1. $U^T U = I$이기 때문에 최소 제곱법에서의 normal equation 중 나온 $(X^T X)^{-1}$과 같이 역행렬을 구할 필요도, 역행렬의 존재 여부를 증명할 필요도 없다.
2. 특성의 수학적 값은 유지하면서도 역행렬의 불필요 및 차원 축소로 더 적은 연산으로 예측 레이블 벡터 $\underline{\hat{y}}$의 값 계산이 가능하다.