---
title: "Machine Learning 정리 노트 2"
subtitle: "Least Squares and Geometry in Machine Learning"
date: "2024-03-22"
use-math: true
---

# [Machine Learning 정리 노트 2] Least Squares and Geometry in Machine Learning

## 1. 개요

해당 정리 노트는 경희대학교 이원희 교수님의 "기계학습" 강의를 정리한 노트이다. 기계 학습의 개념은 선형대수에 대한 이해로 시작된다. 따라서 강의 내용을 본인이 이해한 내용을 바탕으로 선형대수의 개념을 풀어 설명하고자 한다.

## 2. 정리 내용

### 2.1 용어 정리

- 잔차(residual, loss, 혹 error): 실제 레이블값 $y_i$와 예측한 레이블값 $\hat{y}_i$의 사이 나타나는 차이를 의미한다. ( $ r_i = y_i - \hat{y}_i $ )
- span: 벡터들의 선형결합을 통해 만들어진 벡터 공간
- 선형 독립(linear independence): 선형결합된 벡터들의 계수들이 0일 때에만 0으로 표현될 수 있는 상태
- 선형 종속(linear dependence): 선형결합된 벡터들 중 하나의 벡터가 다른 벡터들의 선형결합으로 표현될 수 있는 상태
- 랭크(rank): 행렬의 선형 독립인 행 혹 열들의 개수
- 풀 랭크(full rank): 행렬이 가질 수 있는 최대 랭크, 즉 선형 독립인 최대 행 혹 열들의 개수 (예시: $n \times p$의 행렬 $X$에 대해 $n \ge p$이면 $X$의 풀 랭크는 $p$)

### 2.2 최소 제곱법/최소 자승법(Least Square Method/Least Square Estimation)의 기하학적 관점

[저번 포스트](https://yoonylim.github.io/posts/machine-learning/2024-03-21-machine-learning-1)를 통해 우리는 예측되는 레이블 벡터는 $\underline{\hat{y}} = X \underline{w}$로 표현된다는 것을 알고 있다. 그렇다면 가중치 벡터 $\underline{w}$는 어떻게 결정할 수 있을까?

해당 질문에 대한 답으로 최소 제곱법 혹 최소 자승법으로 불리는 방법을 사용한다. 잔차는 $r_i = y_i - \hat{y}_i$으로 표현되고 이 중 잔차와 예측하는 레이블은 가중치 벡터 $\underline{w}$에 의존적이므로 $r_i(\underline{w}) = y_i - \hat{y}_i(\underline{w})$로도 표현한다. 즉, 가중치 벡터 $\underline{w}$의 각 가중치들을 조절하여 실제 레이블 값과 예측 레이블 값의 차이를 줄여 가장 작은 잔차를 이룰 수 있다.

이를 기하학적으로 표현하자면 잔차 벡터는 각 잔차들로 구성된 벡터로 $\underline{r} = \begin{bmatrix} r_1 \\\\ r_2 \\\\ \vdots \\\\ r_n \end{bmatrix}$로 표현되고, 이는 실제 레이블 벡터 $\underline{y}$와 예측 레이블 벡터 $\underline{\hat{y}}$의 차이인 벡터로 두 벡터 사이의 거리를 나타낸다. [이전 포스트](https://yoonylim.github.io/posts/machine-learning/2024-03-21-machine-learning-1)에서 다룬 거리를 나타내는 $L^2$ norm의 제곱을 사용하여 표현하면 $ \lVert \underline{r}(\underline{w}) \rVert ^2 = \lVert \underline{y} - \underline{\hat{y}} \rVert ^2 =
\sum_{i=1}^n ( y_i - \langle \underline{w}, \underline{x_i} \rangle ) ^2$으로 표현할 수 있다. 이는 $n$차원에서의 피타고라스 정리의 확장된 적용이다.

***가정: 최소 제곱법의 이론 이해를 위해 특성 행렬 $X$의 모든 특성 벡터들이 서로 선형 독립이라고 가정한다.***

그렇다면 $\underline{\hat{y}} = X \underline{w} = w_1 \underline{x_1} + w_2 \underline{x_2} + \dots + w_p \underline{x_p}$이고 이는 $\underline{\hat{y}}$이 행렬 $X$의 열벡터들로 이루어지는 벡터 공간에 속한다는 것을 의미한다. $\underline{\hat{y}}$이 $\underline{x_1}$, $\underline{x_2}$, $\dots$, $\underline{x_p}$로 표현 가능하므로 $\underline{\hat{y}} \in \text{span}(\text{cols}(X))$이다.

***실제 레이블 벡터 $\underline{y}$는 $\text{span}(\text{cols}(X))$ 위에 있을 수도, 공간 외부에 있을 수도 있다.***

간단한 예시를 통해 기하학적 이해를 이끌어내 보자. 행렬 $X$가 2개의 특성 벡터를 지닌다 가정하면 아래 그림과 같이 실제 레이블 벡터 $\underline{y}$, 최적의 예측 레이블 벡터 $\underline{\hat{y}}$, 가장 작은 잔차 벡터 $\underline{r}$, 벡터 공간 $\text{span}(\text{cols}(X))$과의 관계를 나타낼 수 있다. 이때 가장 작은 잔차 벡터라 하면 실제 레이블 벡터와 벡터 공간 간의 거리가 가장 작을 때의 예측 레이블 벡터를 의미하기에 $\underline{r}$은 벡터 공간에 수직일 수밖에 없다.

![img0](/images/machine-learning/20240322/img0.png)

그리고 아직 최적에 이르지 못한 예측 레이블 벡터 $\underline{\tilde{y}}$라 하고 해당 벡터와 실제 레이블 벡터 간의 잔차 벡터 $\underline{\tilde{r}}$를 추가하면 $\underline{\hat{y}}$과 $\underline{\tilde{y}}$의 차이 벡터를 $\underline{d}$라 했을 때 아래와 같은 관계가 완성된다. 당연하게도 아직 최적화되지 않은 잔차 벡터 $\underline{\tilde{r}}$는 벡터 공간에 수직이지 않고 피타고라스 정리에 따라 $\lVert \underline{\tilde{r}} \rVert ^2 = \lVert \underline{r} \rVert ^2 + \lVert \underline{d} \rVert ^2$에서 $\underline{d} \neq 0$이므로 $\lVert \underline{\tilde{r}} \rVert ^2 > \lVert \underline{r} \rVert ^2$이다.

![img1](/images/machine-learning/20240322/img1.png)

위 그림에서 보이듯 잔차를 줄여나가 최적의 상태에 도달하도록 해야 한다. 이제 다시 가중치 벡터로 돌아와 어떻게 해당 개념이 가중치 벡터를 결정하게 되는지 살펴본다.

잔차 벡터 $r(\underline{w})$의 놈을 가장 최소화하는 가중치 벡터를 $\underline{\hat{w}}$이라 하면 다음과 같이 표현할 수 있다:

$$ \underline{\hat{w}} = \underset{\underline{w}}{\text{argmin}} \lVert r(\underline{w}) \rVert ^2 = \underset{\underline{w}}{\text{argmin}} \sum_{i=1}^n (y_i - \langle \underline{w}, \underline{x_i} \rangle) ^2 $$

이때의 잔차 벡터를 $\underline{\hat{r}}$이라 하면 $\underline{\hat{r}} = \underline{y} - X \underline{\hat{w}}$이고 이는 위 그림과 같이 $\text{span}(\text{cols}(X))$에 수직이므로 내적의 특징에 따라 $\underline{x_j}^T \underline{\hat{r}} = 0 \Leftrightarrow X^T \underline{\hat{r}} = 0$이기 때문에 다음과 같은 공식이 유도된다.

$$ \underline{\hat{r}} = \underline{y} - X \underline{\hat{w}}, \qquad X^T \underline{\hat{r}} = 0 $$
$$ \therefore X^T(\underline{y} - X \underline{\hat{w}}) = 0 \quad \Leftrightarrow \quad X^T \underline{y} = X^T X \underline{\hat{w}} $$

이때의 $\underline{\hat{w}}$를 least squares estimation을 만족하는 최소 제곱 추정량이라고도 부른다. 회귀 계수들로 구성된 벡터라는 의미를 지니기도 한다.

위 공식을 이미 우리가 가정한 행렬 $X$의 모든 열벡터가 선형 독립이라는 사실을 활용하여 $\underline{\hat{w}}$에 대한 공식으로 변형할 수 있다. $X$는 $n \geq p$인 $n \times p$ 행렬이므로 $\text{rank}(X) = p$이다. 이에 따라 위 공식에서 $X^T X$로 만들어지는 행렬은 $p \times p$인 대칭행렬이고 이는 full rank 값 $p$를 가지게 된다. 그리고 한 행렬이 full rank를 가질 때 그 행렬은 가역이다! 즉, $X^T X$에 대한 역행렬 $(X^T X)^{-1}$이 존재하므로 위 공식은 아래와 같이 변형할 수 있다.

$$ X^T \underline{y} = X^T X \underline{\hat{w}} \quad \Leftrightarrow \quad (X^T X)^{-1} X^T \underline{y} = (X^T X)^{-1} X^T X \underline{\hat{w}} = I \underline{\hat{w}} = \underline{\hat{w}} $$
$$ \therefore \underline{\hat{w}} = (X^T X)^{-1} X^T \underline{y} $$

위 공식을 Normal Equation이라고 부른다. $(X^T X)$의 역행렬 $(X^T X)^{-1}$는 역행렬의 특성상 유일하기에 구해지는 $\underline{\hat{w}}$ 또한 유일하다.

### 2.3 최소 제곱법/최소 자승법의 장점

최소 제곱법의 장점은 다음과 같다:

1. 음수, 양수 잔차 모두 제곱함으로서 동시에 처리가 가능하다.
2. 쉬운 수학적 접근이 가능하다.
3. 큰 오차를 제곱하여 더 크게 부각시킴으로서 해당 큰 오차를 보다 빠르게 수정할 수 있다.
4. 기하학적인 접근으로 시각적, 공간적 개념 이해가 가능하다.
5. 가우시안 노이즈 모델(Gaussian Noise Model)인 $\underline{y} = X \underline{w} + \underline{\epsilon}$과 연관 짓기 용이하다. (이때, $\underline{\epsilon}$은 가우시안 노이즈이다.)