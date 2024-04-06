---
title: "Machine Learning 정리 노트 6"
subtitle: "Introduction to Singular Value Decomposition"
date: "2024-03-28"
use-math: true
---

# [Machine Learning 정리 노트 6] Introduction to Singular Value Decomposition

## 1. 개요

해당 정리 노트는 경희대학교 이원희 교수님의 "기계학습" 강의를 정리한 노트이다. 기계 학습의 개념은 선형대수에 대한 이해로 시작된다. 따라서 강의 내용을 본인이 이해한 내용을 바탕으로 선형대수의 개념을 풀어 설명하고자 한다.

## 2. 정리 내용

### 2.1 용어 정리

- 특이값 분해(SVD: Singular Value Decomposition): 하나의 행렬 $A$에 대해 두 직교 행렬 $U$와 $V$, 대각 행렬 $\Sigma$에 대해 $A = U \Sigma V$ 형태로의 분해 방법
- 특이 벡터(singular vector): 위 특이값 분해에서의 직교 행렬 $U$와 $V$를 이루는 벡터
- 왼쪽 특이 벡터(left signular vector): 위 특이값 분해에서의 수식 왼쪽에 위치한 직교 행렬 $U$를 이루는 벡터로 기하학적으로 새 부분공간의 기저로 작동함
- 오른쪽 특이 벡터(right singular vector): 위 특이값 분해에서의 수식 오른쪽에 위치한 직교 행렬 $V$를 이루는 벡터로 기하학적으로 벡터의 위치 정보를 포함함
- 특이값(Sigular Value): 위 특이값 분해에서의 대각행렬 $\Sigma$의 음이 아닌 실수 값을 가지는 성분 값으로 대각 행렬로 인해 선형 변환되는 벡터의 크기를 조절함
- 주성분 분석(PCA: Principal Component Analysis): 원 데이터의 특성을 최대한 보존하며 차원 공간을 변환하는 방법

### 2.2 투영(Projection)을 통한 왼쪽 특이 벡터(Left Singular Vector) 구하기

[저번 포스트](https://yoonylim.github.io/posts/machine-learning/2024-03-26-machine-learning-5)에서 우리는 특성 행렬 $X$를 직교 행렬로 분해한다면 더 가변운 연산과 차원 축소가 가능하다는 개념을 습득했다. 행렬 분해 방법에는 유명하게 고유값 분해(Eigenvalue Decomposition)이 있지만 해당 방법은 분해하고자 하는 행렬이 정방 행렬일 때에만 유효하다. 이 때문에 소개되는 행렬의 분해 방법은 특이값 분해(SVD: Singular Value Decomposition)으로 해당 방법은 어떠한 행렬이든지 분해 및 차원 축소를 가능케 한다.

그렇다면 특이해 분해를 위해 먼저 투영의 개념을 활용하여 특이 벡터를 구해보자.

![img0](/images/machine-learning/20240328/img0.png)

위와 같이 특성 행렬 $X$의 특성 열벡터 $x_i$들이 한 부분 공간 위에 존재한다고 가정하자. 그리고 벡터 $\underline{a}$와 $\underline{a}
_\perp$는 새로운 직교 행렬의 기저인 왼쪽 특이 벡터가 될 벡터들이다. 이때 우리는 해당 왼쪽 특이 벡터가 각 특성 벡터들과의 거리, 즉 잔차가 최소화되도록 조정해야 한다. 해당 거리의 제곱은 
$d^2 = \lVert \underline{x_i} - \text{Proj}
_{\underline{a}} \underline{x_i} \rVert^2$로 표현할 수 있으며 우리가 구하고자 하는 왼쪽 특이 벡터 
$\underline{\hat{a}}$는 $\underline{\hat{a}} = \underset{\underline{a}}{\text{argmin}} \sum_{i = 1}^p d_i^2$이다.

이때, 저번 시간에 배운 투영 행렬의 수학적 특성을 새로 이끌어낼 수 있다. 저번 포스트에서도 다루었듯 $A$ 행렬의 부분 공간에 대한 투영 행렬은 $\text{Proj}_{A} = A (A^T A)^{-1} A^T$로 표현되면 이는 아래와 같이 직접 대입해보면 자명하다는 것을 알 수 있는 특성을 가진다:
($\text{Proj}_{A}$을 간단히 $P_A$라 표현한다.)

- $P_A = P^2_A = P_A P_A$
- $P_A = P_A^T = P_A^T P_A \qquad \because P_A$는 항상 대칭 행렬이므로

$P_A$에 대해 행렬 $A$와 직교하는 행렬 $B$가 존재한다고 하여 $A^T B = 0$이라 하자. 그렇다면 어떠한 벡터 $\underline{x}$에 대해 해당 벡터는 두 행렬의 부분 공간에 대해 아래 그림과 같이 표현이 가능하다.

![img1](/images/machine-learning/20240328/img1.png)

위 그림에 따르면 $\underline{x} = I \underline{x} = P_A \underline{x} + P_B \underline{x} = (P_A + P_B) \underline{x}$이므로 $I = P_A + P_B$이고 결국 $P_B = I - P_A$이다. 즉, 우리의 경우에서 특이 벡터 $\underline{a}$와 이에 대한 직교하는 벡터 $\underline{a}
_\perp$에 대해 
$I = P_\underline{a} + P
_{\underline{a}
_\perp}$이고 
$I - P_\underline{a} = P
_{\underline{a}
_\perp}$이다.

만약 행렬 $A$가 ***한 개의 열벡터만 포함하는 행렬***이라고 하여 $A = \underline{a}$라면 아래의 수식이 성립한다.

$$ P_A = P
_\underline{a} = \underline{a} (\underline{a}^T \underline{a})^{-1} \underline{a}^T = \frac{\underline{a} \underline{a}^T}{\underline{a}^T \underline{a}} \qquad \because \underline{a}^T \underline{a} \quad \text{gives a scalar value}$$

그리고 이는 현 상황에서 특이 벡터 $\underline{a}$에 대해 투영하는 경우에 적용 가능하다. 따라서 $d^2 = \lVert \underline{x_i} - \text{Proj}
_{\underline{a}} \underline{x_i} \rVert^2$에 적용하면 아래와 같은 수식이 유도된다.

$$ d^2 = \lVert \underline{x_i} - \text{Proj}
_{\underline{a}} \underline{x_i} \rVert^2 $$
$$ = \lVert \underline{x_i} - \frac{\underline{a} \underline{a}^T}{\underline{a}^T \underline{a}} \underline{x_i} \rVert^2 $$
$$ = \lVert (I - \frac{\underline{a} \underline{a}^T}{\underline{a}^T \underline{a}}) \underline{x_i} \rVert^2 $$
$$ = \underline{x_i}^T (I - \frac{\underline{a} \underline{a}^T}{\underline{a}^T \underline{a}})^T (I - \frac{\underline{a} \underline{a}^T}{\underline{a}^T \underline{a}}) \underline{x_i} $$
$$ = \underline{x_i}^T (I - \frac{\underline{a} \underline{a}^T}{\underline{a}^T \underline{a}}) \underline{x_i} \qquad \because I - P
_\underline{a} = 
P_{\underline{a}
_\perp}, \quad
P_{\underline{a}
_\perp}^T 
P_{\underline{a}
_\perp} =
P_{\underline{a}
_\perp}
$$
$$ = \underline{x_i}^T \underline{x_i} - \frac{\underline{x_i}^T \underline{a} \underline{a}^T \underline{x_i}}{\underline{a}^T \underline{a}} $$

위 수식에서 $\underline{x_i}^T \underline{x_i}$는 스칼라 값을 주고 이는 왼쪽 특이 벡터와 상관 없는 상수가 된다. 따라서 이제 구하고자 하는 특이 벡터 $\underline{\hat{a}}$를 수식으로 표현할 때 해당 부분 생략 시 다음과 같다:

$$ \underline{\hat{a}} = \underset{\underline{a}}{\text{argmin}} \sum_{i = 1}^p d_i^2 $$
$$ = \underset{\underline{a}}{\text{argmin}} \sum_{i = 1}^p - \frac{\underline{x_i}^T \underline{a} \underline{a}^T \underline{x_i}}{\underline{a}^T \underline{a}} $$
$$ = \underset{\underline{a}}{\text{argmax}} \sum_{i = 1}^p \frac{\underline{x_i}^T \underline{a} \underline{a}^T \underline{x_i}}{\underline{a}^T \underline{a}} \qquad \because \text{the minimum of negative value is equal to the maximum of non-negative value} $$
$$ = \underset{\underline{a}}{\text{argmax}} \sum_{i = 1}^p \frac{\underline{a}^T \underline{x_i} \underline{x_i}^T \underline{a}}{\underline{a}^T \underline{a}} \qquad \because \underline{x_i}^T \underline{a}, \quad \underline{a}^T \underline{x_i} = \text{scalars}, \quad \underline{x_i}^T \underline{a} = \underline{a}^T \underline{x_i} $$
$$ = \underset{\underline{a}}{\text{argmax}} \frac{\underline{a}^T X X^T \underline{a}}{\underline{a}^T \underline{a}} $$

즉, 왼쪽 특이 벡터 $ \underline{\hat{a}} = \underset{\underline{a}}{\text{argmax}} \frac{\underline{a}^T X X^T \underline{a}}{\underline{a}^T \underline{a}}$이며 앞으로 첫번째 왼쪽 특이 벡터로서 $\underline{u_1}$으로 표시될 것이다. 이때 $\frac{\underline{\hat{a}}^T \underline{x_1} \underline{x_1}^T \underline{\hat{a}}}{\underline{\hat{a}}^T \underline{\hat{a}}} = \sigma_1^2$이고 이는 첫번째 특이값의 제곱과 같다.

### 2.3 특이값 분해(SVD) 소개

특성 행렬 $X \in \mathbb{R}^{n \times p}$에 대해 특이값 분해 시 $X = U \Sigma V$로 표현할 수 있다.

- $U$는 왼쪽 특이 벡터들로 이루어진 직교 행렬이며 해당 특이 벡터들은 선형 변환된 새로운 부분 공간의 정규 직교 기저가 된다.
- $\Sigma$는 특이값들을 성분으로 가지는 대각 행렬이며 각 특이값들은 양의 실수 값을 가진다.
- $V$는 오른쪽 특이 벡터들로 이루어진 직교 행렬이며 해당 특이 벡터들은 왼쪽 특이 벡터들에 대한 계수, 즉 가중치로 작용하며 원래 특성 행렬 $X$에 대한 특성 정보를 지닌다.

행렬 $\Sigma$에 대해 보다 자세히 살펴보면 아래와 같이 특성 행렬 $X \in \mathbb{R}^{n \times p}$에 대해 $n$과 $p$의 대소 관계에 따라 성분의 모습이 달라진다.

- $n = p$일 때:

$$ \Sigma = \begin{bmatrix} \sigma_1 & 0 & \dots & 0 \\\\ 0 & \sigma_2 & \dots & 0 \\\\ \vdots & \vdots & \ddots & \vdots \\\\ 0 & 0 & \dots & \sigma_n \end{bmatrix} $$

- $n > p$일 때 ($p$개 만큼 특이값이 존재하는 행과 $n-p$개 만큼 0으로 채워진 행들):

$$ \Sigma = \begin{bmatrix} \sigma_1 & 0 & \dots & 0 \\\\ 0 & \sigma_2 & \dots & 0 \\\\ \vdots & \vdots & \ddots & \vdots \\\\ 0 & 0 & \dots & \sigma_p \\\\ 0 & 0 & \dots & 0 \\\\ \vdots & \vdots & \ddots & \vdots \\\\ 0 & 0 & \dots & 0 \end{bmatrix} $$

- $n < p$일 때 ($n$개 만큼 특이값이 존재하는 열과 $p-n$개 만큼 0으로 채워진 열들):

$$ \Sigma = \begin{bmatrix} \sigma_1 & 0 & \dots & 0 & 0 & \dots & 0 \\\\ 0 & \sigma_2 & \dots & 0 & 0 & \dots & 0 \\\\ \vdots & \vdots & \ddots & \vdots & \vdots & \ddots & \vdots \\\\ 0 & 0 & \dots & \sigma_n & 0 & \dots & 0 \end{bmatrix} $$

이때, 특이값의 대소 관계는 $\sigma_1 \geq \sigma_2 \geq \dots \geq \sigma_n$이며 첫번째 특이값이 가장 높은 특성 벡터의 중요도를 의미하기도 한다. (만약 뒤로 가며 값이 0과 가깝운 특이값이 존재한다면 해당 특이값과 곱해지는 차원의 특성 벡터는 새로운 부분 공간에서 제외되다시피 선형 변환이 일어날 것이다.)

다음은 2차원에서 시각화한 특이값 분해에 따른 선형 변환이다. 원래라면 해당 그림 속에서 특성 행렬 $X$에 대해 평면 위에 표현된 각 벡터들은 선형 종속인 벡터들이 다분하기에 좋은 예시는 아닐 것이다.(다차원의 특성 벡터일 때 비로소 특이값 분해에 대한 좋은 적용 예시가 될 것이다.)

![img2](/images/machine-learning/20240328/img2.png)

### 2.4 주성분 분석(PCA)과 특이값 분해(SVD)

위 그림에서 보았듯 새로운 기저 $\sigma_1 u_1$과 $\sigma_2 \u_2$를 통해 각 특성 벡터를 새로운 부분 공간에 표현이 가능하다. 각 주성분 방향은 왼쪽 특이 벡터들인 $u_1$과 $u_2$가 된다. 첫번째 주성분 방향은 $u_1$, 두번째 주성분 방향은 $u_2$가 되며 이는 차원 축소 시 특성 행렬 $X$의 변환 방법에서 유용하게 쓰인다. 결국 주성분 분석은 특이값 분해의 개념을 그대로 적용시킨 저차원으로의 변환 방법이다.