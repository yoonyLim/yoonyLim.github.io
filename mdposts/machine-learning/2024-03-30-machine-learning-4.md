---
title: "Machine Learning 정리 노트 4"
subtitle: "Gradient Descent for Least Squares"
date: "2024-03-30"
use-math: true
---

# [Machine Learning 정리 노트 4] Gradient Descent for Least Squares

## 1. 개요

해당 정리 노트는 경희대학교 이원희 교수님의 "기계학습" 강의를 정리한 노트이다. 기계 학습의 개념은 선형대수에 대한 이해로 시작된다. 따라서 강의 내용을 본인이 이해한 내용을 바탕으로 선형대수의 개념을 풀어 설명하고자 한다.

## 2. 정리 내용

### 2.1 용어 정리

- 경사 하강법(gradient descent): 경사를 구한 뒤 경사의 반대 방향으로 이동시키며 극값에 이를 때까지 반복하는 알고리즘
- 스텝(step): 경사에 양 또는 음의 부호로 더해지는 값
- 스텝 크기(step size): 스텝의 값의 크기; 이 크기에 따라 경사가 급격히 바뀌어 함수의 지점 이동 크기가 너무 커지거나 너무 적게 바뀌어 함수의 지점 이동 크기가 너무 작아지는 경우가 생기며 적절히 조절하는 것이 중요

### 2.2 경사 하강법(Gradient Descent) 기초

[저번 포스트](https://yoonylim.github.io/posts/machine-learning/2024-03-23-machine-learning-3#2.3%20%EC%B5%9C%EC%86%8C%20%EC%A0%9C%EA%B3%B1%EB%B2%95/%EC%B5%9C%EC%86%8C%20%EC%9E%90%EC%8A%B9%EB%B2%95(Least%20Square%20Method/Least%20Square%20Estimation)%EC%9D%98%20%EC%B5%9C%EC%A0%81%ED%99%94%EC%A0%81%20%EA%B4%80%EC%A0%90)에서 가중치 벡터에 대한 함수에 대해 그래프를 그릴 때 아래로 볼록(covex)한 그래프에서 최소값을 찾기가 더 수월하다는 것을 알고 있다. 이번 포스트에서는 해당 원리를 이용하여 기울기의 경사를 조금씩 조정하며 이동하여 최소값에 이르는 알고리즘인 경사 하강법에 대해 설명한다.

$\underline{\hat{w}}$가 잔차를 최소화하는 가중치 벡터라고 할 때, $\underline{\hat{w}} = \underset{\underline{w}}{\text{argmin}} \lVert \underline{y} - X \underline{w} \rVert^2$는 다시 $\underline{\hat{w}} = (X^T X)^{-1} X^T \underline{y}$임을 이전 두 개의 포스트에서 각각 기학학적 관점과 최적화 관점으로 다루었다. 그러나 이때의 문제점은 특성 행렬 $X$가 매우 큰 차원을 가지게 되면 $(X^T X)^{-1}$을 구하는 연산은 매우 무거워진다. 이에 따라 경사 하강법을 사용하면 행렬의 역행렬을 구할 필요 없이 $\underline{\hat{w}}$을 반복적인 수행을 통해 구할 수 있다.

![img0](/images/machine-learning/20240330/img0.png)
*출처: 이원희 교수, "Gradient Descent for Least Squares" (기계 학습, 경희대학교, 2024년 3월 21일)*

가중치 벡터에 대한 함수 $f(\underline{w})$는 위 그림을 이용하여 나타낼 수 있다. 만약 현재 지점의 가중치 벡터 $\underline{v}$와 해당 벡터와 최소값의 가중치 벡터 사이에 있는 가중치 벡터 $\underline{w}$에 대해, $f(\underline{w})$가 $\underline{v}$와 $\underline{w}$로 이루어진 직선의 방정식보다 크거나 같으면 아래로 볼록하다는 의미가 된다. 즉, 모든 $\underline{w}$, $\underline{v}$에 대해 $f(\underline{w}) \geq f(\underline{v} + \nabla f(\underline{v})^T (\underline{w} - \underline{v}))$이면 $f(\underline{w})$은 아래로 볼록한 그래프이다. 해당 직선의 방정식은 $\underline{v}$가 상수 $a$, $\underline{w}$가 변수 $x$라고 생각하고 해당 그래프가 $XY$ 그래프 위에 있다고 생각하여 $f(a) + f'(a)(x - a)$와 비슷한 형태의 그래프이다.

그러나 아래와 같은 경우 그래프의 모든 점들이 한 지점에서의 접선보다 위에 있지 않은 경우들이 있다. 이에 따라 우리는 경사 하강법을 사용할 때 전역 최소값을 구하지 못하고 지역 최소값을 구하게 될 수도 있는 주의점이 있다. 이 때문에 경사 이동의 크기를 "적절히" 조정하여 전역 최소값을 반복적인 실험을 통해 알아내는 수밖에 없다.

![img1](/images/machine-learning/20240330/img1.png)

### 2.3 경사 하강법(Gradient Descent) 과정

경사 하강법에서 추측한 초기 가중치 벡터를 $\underline{w}^{(1)}$라 하고 스텝 사이즈를 $\tau$ $(\tau > 0)$라 하자. 이때 다음 가중치 벡터 $\underline{w}^{(k + 1)}$을 구하는 함수의 경사는 음의 경사를 가져서 최적의 $\underline{w}$의 값을 찾을 때까지 원래 그래프에 대한 접선을 이동시키게 된다. 해당 접선이 음의 기울기를 가지면 점차 양의 값을 더하게 되어 0이 되는 곳을 찾아 최소값이 다다르고 양의 기울기를 가지면 점차 음의 값을 더하게 되어 0이 되는 곳을 찾아 최소값을 찾게 된다. 즉, 다음 가중치 벡터 $\underline{w}^{(k + 1)}$을 구하는 함수는 $\underline{w}^{(k + 1)} = \underline{w}^{(k)} - \tau \nabla_{\underline{w}} f(\underline{w}^{(k)})$로 표현된다. 이때 정확한 최소값을 다다르기 힘든 경우가 많기에 기울기가 점차 줄어 최소값 근처에 충분히 가깝기 이르렀는지를 판단하는 값 $\epsilon$이 있다. 따라서 $\lVert \underline{w}^{(k + 1)} - \underline{w}^{(k)} \rVert_2 < \epsilon$여서 충분히 오차가 적어졌을 경우 경사 하강법의 반복을 멈추게 된다.

우리는 최적화점 관점에서 가중치 벡터 $\underline{w}$에 대해 $f(\underline{w}) = \lVert \underline{y} - X \underline{w} \rVert^2 = \underline{y}^T \underline{y} - 2 \underline{w}^T X^T \underline{y} + \underline{w}^T X^T X \underline{w}$임을 알고 있다. 따라서 $f(\underline{w})$를 미분하여 얻는 경사는 $\nabla_\underline{w} f(\underline{w}) = -2X^T y + 2X^T X \underline{w}$이고 이를 앞서 구한 다음의 가중치 벡터를 구하는 식에 대입하면 다음과 같이 말할 수 있다.

$$ \underline{w}^{(k + 1)} = \underline{w}^{(k)} - \tau \nabla_\underline{w} f(\underline{w}^{(k)}) $$
$$ = \underline{w}^{(k)} - \tau ( 2X^T X \underline{w}^{(k)} - 2X^T y )$$
$$ = \underline{w}^{(k)} - 2 X^T \tau ( X \underline{w}^{(k)} - y ) $$

그리고 해당 함수의 반복이 멈추는 조건은 $\lVert \underline{w}^{(k + 1)} - \underline{w}^{(k)} \rVert_2 < \epsilon$이다.

### 2.4 경사 하강법(Gradient Descent) 주피터 노트북