---
title: "Machine Learning 정리 노트 3"
subtitle: "Least Squares and Optimization in Machine Learning"
date: "2024-03-23"
use-math: true
---

# [Machine Learning 정리 노트 2] Least Squares and Optimization in Machine Learning

## 1. 개요

해당 정리 노트는 경희대학교 이원희 교수님의 "기계학습" 강의를 정리한 노트이다. 기계 학습의 개념은 선형대수에 대한 이해로 시작된다. 따라서 강의 내용을 본인이 이해한 내용을 바탕으로 선형대수의 개념을 풀어 설명하고자 한다.

## 2. 정리 내용

### 2.1 용어 정리

- 활성화 함수(activation function): 입력 신호를 다른 일정한 출력 신호로 변환하는 함수; 주로 층을 쌓아 비선형 연산을 하기 위해 비선형 함수를 사용한다. (예시: Sigmoid, tanh, ReLU, ELU 함수 등)
- 양의 정부호 행렬(Positive Definite Matrix): 고유값이 양수인 대칭행렬; 고유값이 양수이고 정방행렬인 대칭행렬이기에 벡터에 곱해졌을 경우 "뒤집지 않는" 선형변환으로 작동한다.

### 2.2 분류 규칙(Classification Rule)

예측한 레이블이 -1 혹은 1로 분류될 수 있어서 $y_i \in \\{-1, +1\\}$이라고 하자. 이때 [이전 포스트](https://yoonylim.github.io/posts/machine-learning/2024-03-22-machine-learning-2)에서 이끌어낸 잔차를 최소화하는 가중치 벡터 $\underline{\hat{w}}$을 활용하면 예측한 레이블 벡터는 $\underline{\hat{y}} = X \underline{\hat{w}}$로 표현할 수 있다. 그러나 $\underline{\hat{y}}$의 스칼라들은 정확하게 -1이나 1의 값이 아니라 어떠한 실수 값으로 존재한다. 이에 따라 예측한 레이블을 바탕으로 분류할 수 있는 규칙이 필요하다. 따라서 아래와 같은 부호 함수(sign function)을 통해 음수 레이블은 -1, 양수 레이블은 1로 조정할 수 있다. 이때 해당 부호 함수는 활성화 함수(activation function)이다. 이에 따라 새로운 예측 레이블 $\tilde{y}_i$는 $\tilde{y}_i = \text{sign}(\hat{y}_i) \in \\{-1, +1\\}$로 표현되어 우리의 예측 레이블이 실제 레이블과 같은지 혹 다른지 판단할 수 있는 기준이 된다.

![img0](/images/machine-learning/20240323/img0.png)

위에서 제시한 모델을 토대로 새로운 샘플인 벡터 $\underline{x}_\text{new} \in \mathbb{R}^p$에 대한 분류를 진행할 수 있다. 새로운 샘플에 대한 예측 레이블 벡터는 
$\underline{\hat{y}}_\text{new} = 
\langle \underline{\hat{w}}, \underline{x}_\text{new} \rangle$이고, 부호 함수를 통해 새로운 예측 레이블 벡터 
$\tilde{y}_\text{new} = 
\text{sign}(\hat{y}_\text{new})$가 생성된다.

따라서 분류를 위한 선형 모델 생성 과정은 다음과 같이 나열할 수 있다:

1. 모든 트레이닝 데이터셋으로 학습시킨다.
2. 학습시키며 적절한 가중치 벡터를 얻어 트레이닝 데이터셋에 맞는 선형 모델을 만든다.
3. 새로운 샘플을 구한다.
4. 새로운 샘플과 선형 모델을 위해 구한 가중치 벡터의 내적을 구한다.
5. 해당 내적의 값에 대한 예측 레이블을 생성한다.

### 2.3 최소 제곱법/최소 자승법(Least Square Method/Least Square Estimation)의 최적화적 관점

이전 포스트를 통해 $\underline{\hat{w}} = \underset{\underline{w}}{\text{argmin}} \lVert \underline{y} - X \underline{w} \rVert^2$라는 정의로 시작하여 기하학적 증명을 통해 $\underline{\hat{w}} = (X^T X)^{-1} X^T \underline{y}$임을 도출했다. 그리고 이는 최적화(optimization)의 관점으로도 도출해낼 수 있는 결과이다.

***가정: 이론 이해를 위해 특성 행렬 $X$의 모든 특성 벡터들이 서로 선형 독립이라고 가정한다.***

한 벡터 $\underline{a}$의 크기의 제곱은 $L^2$ norm의 제곱이고 이는 $\lVert \underline{a} \rVert^2 = \underline{a}^T\underline{a}$로 표현할 수 있다. 따라서 다음과 같은 식을 유도할 수 있다.

$$ \underline{\hat{w}} = \underset{\underline{w}}{\text{argmin}} \lVert \underline{y} - X \underline{w} \rVert^2 $$
$$ = \underset{\underline{w}}{\text{argmin}} (\underline{y} - X \underline{w})^T (\underline{y} - X \underline{w}) $$
$$ = \underset{\underline{w}}{\text{argmin}} \\{ \underline{y}^T \underline{y} - (X \underline{w})^T \underline{y} - \underline{y}^T X \underline{w} + (X \underline{w})^T (X \underline{w}) \\} $$
$$ = \underset{\underline{w}}{\text{argmin}} ( \underline{y}^T \underline{y} - \underline{w}^T X^T \underline{y} - \underline{y}^T X \underline{w} + \underline{w}^T X^T X \underline{w} ) $$
$$ = \underset{\underline{w}}{\text{argmin}} ( \underline{y}^T \underline{y} - 2 \underline{w}^T X^T \underline{y} + \underline{w}^T X^T X \underline{w} ) $$

위 식 네번째 줄에서 $- \underline{w}^T X^T \underline{y}$와 $- \underline{y}^T X \underline{w}$가 하나의 항으로 합쳐질 수 있는 이유는 다음과 같다.<br>
첫째로 $X \in \mathbb{R}^{n \times p}$, $\underline{w} \in \mathbb{R}^{p \times 1}$, $\underline{y} \in \mathbb{R}^{n \times 1}$에 대해 $\underline{w}^T X^T \underline{y}$은 $(1 \times p)$ 벡터 곱하기 $(p \times n)$ 행렬 곱하기 $(n \times 1)$ 벡터의 값으로 $(1 \times 1)$인 스칼라,  $\underline{y}^T X \underline{w}$ 또한 $(1 \times n)$ 벡터 곱하기 $(n \times p)$ 행렬 곱하기 $(p \times 1)$ 벡터의 값으로 $(1 \times 1)$인 스칼라가 나오기에 합이 가능하고,<br>
둘째로 두 항 모두 스칼라인 상황에서 $\underline{w}^T X^T \underline{y} = (\underline{y}^T X \underline{w})^T$이기 때문에 하나의 항으로 합칠 수 있다.

즉, $\underline{\hat{w}} = \underset{\underline{w}}{\text{argmin}} ( \underline{y}^T \underline{y} - 2 \underline{w}^T X^T \underline{y} + \underline{w}^T X^T X \underline{w} )$으로 표현할 수 있을 때, $\underline{\hat{w}}$을 최소화시키는 최적화 방법을 적용할 수 있다. 해당 방법은 벡터에 대한 미분을 표현하는 그래디언트(gradient)를 활용하는 것이다.

이때, 열벡터들이 선형 독립이라 가정한 행렬 $X$에 대해 $X^T X$는 가역이며 양의 정부호 행렬(Positive Definite Matrix)이다. p.d.(positive definite)인 행렬에 대해서는 다음과 같은 특성들이 존재한다:

1. p.d.인 행렬 $P$와 $Q$에 대해 $P \succ 0$이고 $Q \succ 0$이면 $P + Q \succ 0$이다.
2. p.d.인 행렬 $Q$와 스칼라 $a$에 대해 $Q \succ 0$이고 $a > 0$이면 $aQ \succ 0$이다.
3. 행렬 $A$에 대해 $A^T A \succcurlyeq 0$이고 $A A^T \succcurlyeq 0$이다.
4. 행렬 $Q$에 대해 $Q \succcurlyeq 0$이면 역행렬 $Q^{-1}$이 존재한다.
5. 행렬 $P$와 $Q$에 대해 $Q \succcurlyeq P$이면 $Q - P \succcurlyeq 0$이다.

p.d. 행렬인 $X^T X$의 성질을 이용하면 가중치 벡터의 최적화를 이룰 수 있는데 해당 성질은 p.d.인 행렬 $X^T X$와 영벡터가 아닌 벡터 $\underline{z}$에 대해 $\underline{z}^T X^T X \underline{z} > 0$이라는 것이다. 증명은 간단하다. $\underline{z}^T X^T X \underline{z} = (\underline{z} X)^T X \underline{z} = \lVert X \underline{z} \rVert^2 > 0$이기 때문이다. 이는 당연하게도 $X \underline{z} \neq 0$이기 때문인데 이유는 가정 상 $X$이 가역이라는 것은 $\det(X) \neq 0$이라는 의미이고 이는 선형변환으로 동작하는 행렬 $X$가 벡터 $\underline{z}$와 곱해졌을 때 $\underline{z}$의 크기를 0으로 만들지 않는다는 의미이기 때문이다. 이때 p.d.인 행렬 $Q$와 영벡터가 아닌 벡터 $\underline{x}$에 대해 $\underline{x}^T Q \underline{x} > 0$인 것을 $Q \succ 0$라고 표현하며 "Q is curly greater than 0"라고 말한다.

p.d.인 행렬 $Q$와 영벡터가 아닌 벡터 $\underline{x}$에 대해 $\underline{x}^T Q \underline{x} = Q \underline{x}^2$이 성립한다. 이는 $n$이 양수라 할 때 간단한 p.d.인 행렬 $Q = \begin{bmatrix} n & 0 \\\\ 0 & n \end{bmatrix}$와 벡터 $\underline{x} = \begin{bmatrix} x_1 \\\\ x_2 \end{bmatrix}$로 살펴보면 $\underline{x}^T Q \underline{x} = \begin{bmatrix} x_1 & x_2 \end{bmatrix} \begin{bmatrix} n & 0 \\\\ 0 & n \end{bmatrix} \begin{bmatrix} x_1 \\\\ x_2 \end{bmatrix} = \begin{bmatrix} x_1 & x_2 \end{bmatrix} \begin{bmatrix} n x_1 \\\\ n x_2 \end{bmatrix}  = n {x_1}^2 + n {x_2}^2 = n({x_1}^2 + {x_2}^2) = Q \underline{x}^2$과 같은 형태가 도출되기 때문이다.

이에 따라 영벡터가 아닌 벡터 $\underline{x} \in \mathbb{R}^2$, p.d.인 행렬 $Q \in \mathbb{R}^{2 \times 2}$에 대해 간단히 $Q = \begin{bmatrix} 1 & 0 \\\\ 0 & 1 \end{bmatrix} = I$라 하면 $f(\underline{x}) = \underline{x}^T Q \underline{x} = \underline{x_1}^2 + \underline{x_2}^2$이며 이는 아래 그래프와 같다.

![img1](/images/machine-learning/20240323/img1.png)

위에서 $x$축은 $x_1$, $y$축은 $x_2$를 나타낸다. 위 그래프는 아래로 볼록한 그래프이므로 $f(\underline{x})$의 최소값을 찾기 쉽다. 이때 최솟값은 꼭짓점일 것이다. 그렇지만 해당 점에서는 $\underline{x}$가 영벡터인 꼴이고 많은 실질적인 상황에서는 최소값이 영벡터일 때는 찾기 힘들 것이다.<br>
반대로 $Q = \begin{bmatrix} -1 & 0 \\\\ 0 & -1 \end{bmatrix}$인 음의 정부호 행렬(Negative Definite Matrix)일 때는 아래와 같은 그래프가 생성되며 최소값을 찾기가 매우 어려워진다. 따라서 $\underline{\hat{w}}$을 최소화하여 최적화하는 과정에 p.d.인 행렬인 $X^T X$를 활용하는 것은 매우 중요하다.

![img2](/images/machine-learning/20240323/img2.png)

처음 시작한 $\underline{\hat{w}}$ 대한 식은 $\underline{w}$의 함수이므로 $f(\underline{w})$라 할 수 있다. 이때 가중치 벡터 $\underline{w}$에 대한 그래디언트(고차원에서의 미분이라 생각하면 된다)는 $\nabla_\underline{w}f$로 표현할 수 있다. 해당 그래디언트는 다음과 같은 의미를 가진다.

$$ \nabla_\underline{w}f = \begin{bmatrix} \frac{df}{dw_1} \\\\ \frac{df}{dw_2} \\\\ \vdots \\\\ \frac{df}{dw_p} \end{bmatrix}$$

마지막 단계에 앞서 다음과 같은 가정을 세운다.

***가정 1: $X$의 열벡터들은 선형 독립이다.***
***가정 2: $X^T X$는 p.d. 행렬이고 f(\underline{w})은 아래로 볼록한 그래프를 그린다.***
***가정 3: $\underline{w}$는 대칭 행렬이다.***

이를 염두에 두고 원래 식을 최소화하려 그래디언트를 적용하면 다음과 같다. 

$$ f(\underline{w}) = \underline{\hat{w}} = \underline{y}^T \underline{y} - 2 \underline{w}^T X^T \underline{y} + \underline{w}^T X^T X \underline{w} $$
$$ \Leftrightarrow \nabla_\underline{w}f = 0 - 2 X^T y + 2 X^T X \underline{w}$$

이후 최소화된 $\underline{\hat{w}}$을 구하기 위해 $f(\underline{w}) = 0$이라 하여 풀면 다음과 같다.

$$ \nabla_\underline{w}f = - 2 X^T y + 2 X^T X \underline{w} = 0 $$
$$ \Leftrightarrow  X^T y = X^T X \underline{w} $$
$$ \therefore \underline{\hat{w}} = (X^T X)^{-1} X^T \underline{y} \qquad \because \underline{\hat{w}} = \underline{w} \quad \text{given that} \quad \nabla_\underline{w}f = 0 $$

이와 같이 기하학적 관점 외로 최적화 방식을 통해서도 $\underline{\hat{w}} = (X^T X)^{-1} X^T \underline{y}$임을 이끌어냈다.