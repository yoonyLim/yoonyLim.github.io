---
title: "Machine Learning 정리 노트 1"
subtitle: "Vectors and Matrices"
date: "2024-03-21"
use-math: true
---

# [Machine Learning 정리 노트 1] Vectors and Matrices

## 1. 개요

해당 정리 노트는 경희대학교 이원희 교수님의 "기계학습" 강의를 정리한 노트이다. 기계 학습의 개념은 선형대수에 대한 이해로 시작된다. 따라서 강의 내용을 본인이 이해한 내용을 바탕으로 선형대수의 개념을 풀어 설명하고자 한다.

## 2. 정리 내용

### 2.1 용어 정리

- 기계 학습: 실험 및 관측을 통해 얻은 데이터로 컴퓨터가 패턴을 식별하도록 하는 학습
- 초반에 배우는 기계 학습: 회귀 및 분류에 쓰이는 선형 모델을 생성
- 선형 모델: 데이터셋이 주어질 때, 데이터 레이블(label)의 예측값 벡터를 특성 행렬과 가중치 벡터의 결합으로 표현하는 모델
- 레이블(label): 특성과 가중치를 통해 예측하는 값
- 특성(feature): 데이터셋에서 추출하여 수치화할 수 있는 데이터의 특성
- 가중치(weight): 각 특성의 계수로 활동하여 특성마다 중요도를 부여하는 값

정말 간단하게 예시를 통해 용어를 정리하고자 한다. 아래와 같은 데이터셋이 주어졌을 때, 특성은 "몸 길이"와 "체중"이고 예측하고자 하는 레이블은 "38개월 뒤 생존 여부"로 말할 수 있다.

| 샘플 | 몸 길이 | 체중 | 38개월 뒤 생존 여부 |
| :---: | :---: | :---: | :---: |
| 생쥐 1 | 12cm | 30g | X |
| 생쥐 2 | 7cm | 20g | O |

이때 각 $i$번째 샘플에 대해 "38개월 뒤 생존 여부"라는 예측되는 레이블을 $\hat{y}$, 첫번째 특성 "몸 길이"를 $x_{i1}$ 
, 두번째 특성 "체중"을 $x_{i2}$ , 각 특성에 대한 가중치를 각각 $w_1$, $w_2$라 한다면 다음과 같은 선형 모델로 레이블 $\hat{y}$를 예측할 수 있다.

$$ \hat{y} = w_1
x_{i1} + w_2
x_{i2} $$

### 2.2 선형 모델 구성 요소에 대한 수학적 표현

위 간단한 예시에서 보았듯 레이블, 특성, 가중치 등 선형 모델을 이루는 구성 요소는 수학 기호로 수학적 모델을 표현한다. 그리고 수학적 모델을 표현하기 위해 선형대수를 사용하게 되는데, 해당 이유로는 다음과 같은 이유가 있다:

1. 벡터와 행렬을 이용하여 수학적으로 간결히 표현할 수 있기 때문
2. 벡터와 행렬의 특성들을 사용하여 식의 유도가 용이하기 때문
3. 시각적, 공간적 개념 표현이 가능하기 때문

그렇다면 해당 수업에서 일반적으로 각 요소를 어떻게 표현하는지 살펴본다. (편의상 특성 벡터나 가중치 벡터 표기 시 $\underline{w}$으로 표현한다.)

- 데이터셋에서 주어지는 레이블(label) 값: $y$
- 예측한 레이블(label) 값: $\hat{y}$
- 샘플의 개수: $n$
- 특성의 개수: $p$
- $i$번째 샘플의 특성(feature) 벡터: $\underline{x_i}$
- 가중치(weight) 벡터: $\underline{w}$
- $i$번째 샘플의 $j$번째 특성 값: $x_{ij}$
- $j$번째 특성에 대한 가중치 값: $w_j$

### 2.3 선형 모델에 대한 수학적 이해

학습을 위한 데이터 $n$개의 샘플과 $p$개의 특성이 있다고 하자. $i=1, 2, 3, \dots, n$일 때, 데이터셋 $(x_i, y_i)$에 대해 $x_i \in \mathbb{R}^p$이다. 즉, $\underline{x_i}$라는 특성 벡터는 $p$개의 실수인 특성 값들로 이루어진 벡터이다. 가중치 벡터 $\underline{w}$도 $p$개의 실수인 가중치 값들로 이루어지므로 $\underline{w} \in \mathbb{R}^p$라 할 수 있다.
<br>
그리고 주어진 레이블 $y_i$는 기계 학습 목적에 따라 $y_i \in \\{ -1, +1 \\}$, $y_i \in \\{ 0, 1 \\}$, 혹은 $y_i \in \mathbb{R}$에 해당되는 원소로 표현된다. 
<br>
주어진 데이터셋을 통해 생성되는 모델은 새로 주어지는 샘플 $\underline{x_0}$에 대해 레이블 $\hat{y}$의 값을 예측하게 된다.
<br>
이때 $i$번째 샘플에 대해 예측하는 레이블 $\hat{y}_i$ 값은 해당 샘플의 특성 벡터$\underline{x_i}$와 가중치 벡터 $\underline{w}$의 내적으로 구해지는 스칼라값이다. (두 벡터의 내적은 스칼라이므로)

***참고: 본 수업에서는 특성 벡터와 가중치 벡터를 열벡터(column vector)로 사용한다. (대부분의 기계 학습 수업에서도 특성 벡터와 가중치 벡터를 열벡터로 취급하지만 일부 행벡터를 사용하는 곳도 있으므로 주의해야 한다.)***

내적을 구하기 위해서 전치의 의미를 알아둘 필요가 있다. 전치란 간단히 말하면 행과 열을 맞바꾸는 것을 말한다. 즉, 열벡터는 전치하면 행벡터가 된다. 이를 통해 내적을 계산하면 두 벡터 $\underline{u} = \begin{bmatrix} u_1 \\\\ u_2 \end{bmatrix}$와 $\underline{v} = \begin{bmatrix} v_1 \\\\ v_2 \end{bmatrix}$의 내적 $\langle \underline{u}, \underline{v} \rangle$는 $$\langle \underline{u}, \underline{v} \rangle = \underline{u}^T \underline{v} = \begin{bmatrix} u_1 & u_2 \end{bmatrix} \begin{bmatrix} v_1 \\\\ v_2 \end{bmatrix} = \underline{u} \underline{v}^T = \begin{bmatrix} u_1 \\\\ u_2 \end{bmatrix} \begin{bmatrix} v_1 & v_2 \end{bmatrix} = u_1 v_1 + u_2 v_2$$ 이다.

즉, 위의 내용을 종합하여 $i$번째 샘플의 특성 벡터 $\underline{x_i}$와 가중치 벡터 $\underline{w}$의 내적으로 에측 레이블값 $\hat{y}_i$을 계산한다면 아래와 같다:

$$
\underline{x_i} =
\begin{bmatrix} 
x_{i1} \\\\ 
x_{i2} \\\\
\vdots \\\\
x_{ip}
\end{bmatrix} \in \mathbb{R}^p, 
\qquad
\underline{w} = \begin{bmatrix} w_1 \\\\ w_2 \\\\ \vdots \\\\ w_p \end{bmatrix} \in \mathbb{R}^p
$$

일 때,

$$ \hat{y}_i = \langle \underline{w}, \underline{x_i} \rangle = \underline{w}^T \underline{x_i} = \underline{w} \underline{{x_i}}^T = w_1
x_{i1} + w_2
x_{i2} + \dots + w_p
x_{ip}$$

이다.

그래프 상에서 2개의 특성을 가지는 특성 벡터 $\underline{x_0} = \begin{bmatrix} 
x_{01} \\\\ 
x_{02} \end{bmatrix}$에 대해 가중치 벡터가 $\underline{w} = \begin{bmatrix} 4 \\\\ 1 \end{bmatrix}$라고 하면 $\langle \underline{w}, \underline{x_0} \rangle = \begin{bmatrix} 
x_{01} & 
x_{02} \end{bmatrix} \begin{bmatrix} 4 \\\\ 1 \end{bmatrix} =
4x_{01} + 
x_{02}$이므로 아래와 같은 선형 모델이 만들어질 것이다.

![img0](/images/machine-learning/20240321/img0.png)

이때 $y$축은 $x_{02}$를 의미하고
$x$ 축은 $x_{01}$을 의미한다.

때로는 데이터셋에 따라 오프셋(offset) 혹은 편향(bias)를 의미하는 상수가 존재한다. 이를 $w_0$로 표현할 수 있으며 데이터 분석에서는 편향은 시스템의 오류로, 오프셋을 더해 오차를 줄일 수 있다고 한다. 아래와 같이 오프셋 혹은 편향을 포함하는 특성 벡터와 가중치 벡터로도 $\hat{y}_i$를 표현 가능하다.

$$
\underline{x_i} = \begin{bmatrix} 1 \\\\
x_{i1} \\\\
x_{i2} \\\\ \vdots \\\\
x_{ip} \end{bmatrix}\text{,} \qquad \underline{w} = \begin{bmatrix} w_0 \\\\ w_1 \\\\ w_2 \\\\ \vdots \\\\ w_p \end{bmatrix} \in \mathbb{R}^{p+1}
$$

일 때,

$$\hat{y}_i = \langle \underline{w}, \underline{x_i} \rangle = w_0 + w_1 
x_{i1} + w_2
x_{i2} + \dots + w_p
x_{ip}$$

위 선형 모델에서 오프셋 혹 편향은 그래프상 선형 모델을 세로축으로 움직이는 절편의 특성을 띠게 된다.

그러나 우리에게는 한 개의 샘플에 대해서만 레이블을 예측하는 것이 아니라 $n$개의 샘플 모두에 대한 예측 레이블값을 계산하게 된다. 따라서 $\hat{y}$ 벡터는 각 샘플에 대한 레이블값(스칼라)들로 구성된 벡터가 되고 행렬 $X$는 각 샘플의 특성 벡터들로 이루어진 $n \times p$ 행렬이다. 즉, 행렬 $X$는 $n$개의 전치된 특성 벡터들로 이루어져 $n$개의 행과 $p$개의 열로 구성된다. 이에 대한 개념으로 확장하면 $\underline{\hat{y}}$ 벡터는 다음과 같이 표현할 수 있다.

$$
X = \begin{bmatrix}
x_{11} 
& x_{12} 
& \dots & x_{1p} \\\\
x_{21} 
& x_{22} 
& \dots & x_{2p} \\\\
\vdots & \vdots & \ddots & \vdots \\\\ 
x_{n1}
& x_{n2}
& \dots & x_{np}
\end{bmatrix} \in \mathbb{R}^{n \times p}
$$

일 때,

$$
\underline{\hat{y}} = \begin{bmatrix} y_1 \\\\ y_2 \\\\ \vdots \\\\ y_n \end{bmatrix} = 
\begin{bmatrix}
x_{11} 
& x_{12} 
& \dots & x_{1p} \\\\
x_{21} 
& x_{22} 
& \dots & x_{2p} \\\\
\vdots & \vdots & \ddots & \vdots \\\\ 
x_{n1}
& x_{n2}
& \dots & x_{np}
\end{bmatrix}
\begin{bmatrix}
w_1 \\\\ w_2 \\\\ \vdots \\\\ w_p
\end{bmatrix} = w_1 \begin{bmatrix} 
x_{11} \\\\ 
x_{21} \\\\ 
\vdots \\\\
x_{n1} \end{bmatrix} + w_2 \begin{bmatrix} 
x_{12} \\\\ 
x_{22} \\\\ 
\vdots \\\\
x_{n2} \end{bmatrix} + \dots + w_p \begin{bmatrix} 
x_{1p} \\\\ 
x_{2p} \\\\ 
\vdots \\\\
x_{np} \end{bmatrix} = X \underline{w} \qquad \therefore \underline{\hat{y}} = X \underline{w}
$$

간단한 예시를 들자면 $X = \begin{bmatrix} 1 & 2 \\\\ 3 & 5 \\\\ 0 & 4 \end{bmatrix}$ 행렬은 2개의 특성을 가진 3개의 샘플로 구성된 행렬이라는 것을 알 수 있다. 해당 행렬은 $\underline{x_1} = \begin{bmatrix} 1 \\\\ 2 \end{bmatrix}$, $\underline{x_2} = \begin{bmatrix} 3 \\\\ 5 \end{bmatrix}$, $\underline{x_3} = \begin{bmatrix} 0 \\\\ 4 \end{bmatrix}$의 특성 벡터들로 구성된다. 이때 가중치 벡터가 $\underline{w} = \begin{bmatrix} 1 \\\\ 3 \end{bmatrix}$이라면 아래와 같은 $\underline{\hat{y}}$이 도출될 것이다.

$$\underline{\hat{y}} = X \underline{w} = \begin{bmatrix} 1 & 2 \\\\ 3 & 5 \\\\ 0 & 4 \end{bmatrix} \begin{bmatrix} 1 \\\\ 3 \end{bmatrix} = 1 \begin{bmatrix} 1 \\\\ 3 \\\\ 0 \end{bmatrix} + 3 \begin{bmatrix} 2 \\\\ 5 \\\\ 4 \end{bmatrix} = \begin{bmatrix} 1 \\\\ 3 \\\\ 0 \end{bmatrix} + \begin{bmatrix} 6 \\\\ 15 \\\\ 12 \end{bmatrix} = \begin{bmatrix} 7 \\\\ 18 \\\\ 12 \end{bmatrix}$$

### 2.4. 비선형 모델에 대한 선형 모델의 활용

기계 학습은 선형 모델과 같이 단순한 예측으로만 이루어지지 않는다. 오히려 실제 환경에서는 많은 실험 관측들이 비선형적인 모델이기에 선형 모델만으로 회귀 및 분류를 이루어낼 수는 없다. 그렇지만 선형 모델의 개념을 활용하면 비선형 모델 또한 생성해낼 수 있다. 아래와 같은 3차 그래프와 같은 비선형 모델이 있다고 하자.

![img1](/images/machine-learning/20240321/img1.png)

위 비선형 모델은 차수가 3이므로 특성 개수 $p$가 4인(${z_i}^0$, ${z_i}^1$, ${z_i}^2$, ${z_i}^3$) $n$개의 샘플로 이루어진 행렬과 가중치 벡터의 곱으로 표현할 수 있다.

$$
\underline{\hat{y}} = X \underline{w} = \begin{bmatrix} 1 & z_1 & {z_1}^2 & {z_1}^3 \\\\ 1 & z_2 & {z_2}^2 & {z_2}^3 \\\\ \vdots & \vdots & \vdots & \vdots \\\\ 1 & z_n & {z_n}^2 & {z_n}^3 \end{bmatrix} \begin{bmatrix} w_1 \\\\ w_2 \\\\ w_3 \\\\ w_4 \end{bmatrix}
$$

이때 위의 $X$와 같은 행렬을 방데르몽드 행렬(Vandermonde matrix)이라 부른다.

### 2.5 알아두어야 할 선형대수 지식

1. 행렬 분해(Matrix Decomposition)

하나의 행렬 $X$는 두 행렬의 곲으로 표현될 수도 있다. 예를 들어 $X \in \mathbb{R}^{n \times p}$일 때, 해당 행렬이 $X = UV$로 표현될 수 있다면 $U \in \mathbb{R}^{n \times r}$, $V \in \mathbb{R}^{r \times p}$이다.
행렬 분해의 방법들 중 대표적으로 LU 분해, QR 분해, 고윳값 분해(Eigen-value Decomposition), 스펙트럼 분해(Spectral Decomposition), 특이값 분해(SVD: Singular Value Decomposition)가 있지만 추후 수업 내용으로 나올 것이다. 행렬 분해는 데이터 차원 축소를 위해 필요하다.

2. 벡터의 내적(Inner Product)과 외적(Outer Product)

같은 크기의 열벡터 $\underline{u} = \begin{bmatrix} u_1 \\\\ u_2 \\\\ \vdots \\\\ u_n \end{bmatrix}$와 $\underline{v} = \begin{bmatrix} v_1 \\\\ v_2 \\\\ \vdots \\\\ v_n \end{bmatrix}$에 대해 두 벡터의 내적과 외적은 다음과 같다:

- 내적: 교환법칙이 성립하여 $\underline{u}^T \underline{v}$ 혹은 $\underline{v}^T \underline{u}$로 표현되며 결과는 한 벡터를 다른 벡터 위에 사영한 크기의 스칼라이다. ( $\underline{u} \cdot \underline{v} = \lvert \underline{u} \rvert \lvert \underline{v} \rvert \cos{\theta}$ )

$$ \underline{u} \cdot \underline{v} = \underline{u}^T \underline{v} = \begin{bmatrix} u_1 & u_2 & \dots & u_n \end{bmatrix} \begin{bmatrix} v_1 \\\\ v_2 \\\\ \vdots \\\\ v_n \end{bmatrix} = \underline{v}^T \underline{u} = \begin{bmatrix} v_1 & v_2 & \dots & v_n \end{bmatrix} \begin{bmatrix} u_1 \\\\ u_2 \\\\ \vdots \\\\ u_n \end{bmatrix} = u_1 v_1 + u_2 v_2 + \dots + u_n v_n$$

- 외적: $\underline{u} \underline{v}^T$(기호를 사용하면 $\underline{u} \otimes \underline{v}$)로 표현되며 결과는 $n \times n$의 행렬이다. 

$$ \underline{u} \otimes \underline{v} = \underline{u} \underline{v}^T = \begin{bmatrix} u_1 \\\\ u_2 \\\\ \vdots \\\\ u_n \end{bmatrix} \begin{bmatrix} v_1 & v_2 & \dots & v_n \end{bmatrix} = \begin{bmatrix} u_1 v_1 & u_1 v_2 & \dots & u_1 v_n \\\\ u_2 v_1 & u_2 v_2 & \dots & u_2 v_n \\\\ \vdots & \vdots & \ddots & \vdots \\\\ u_n v_1 & u_n v_2 & \dots & u_n v_n \end{bmatrix}$$

우리가 흔히 벡터의 외적으로 알고 있는 $u \times v$는 벡터곱(Cross Product)이며 결과는 방향은 두 벡터에 수직이고 크기는 두 벡터가 이루는 정사각형의 넓이인 벡터이다. ( $ \lvert \underline{u} \times \underline{v} \rvert = \lvert \underline{u} \rvert \lvert \underline{v} \rvert \sin{\theta}$ )

3. Orthogoanl(직교), Norm(놈), Orthonormal(정규 직교)

같은 크기의 열벡터 $\underline{u} = \begin{bmatrix} u_1 \\\\ u_2 \\\\ u_3 \end{bmatrix}$와 $\underline{v} = \begin{bmatrix} v_1 \\\\ v_2 \\\\ v_3 \end{bmatrix}$에 대해 직교, 정규, 정규 직교는 다음과 같은 특징을 갖는다:

- 직교: 두 벡터가 서로 수직으로 만나 직교한다면 $\underline{u}^T \underline{v} = 0$이다. (한 벡터가 다른 벡터 위로 사영되어도 수직이라 사영된 크기가 0이므로, 두 벡터 사이의 각도 $\theta = 0$이므로)
- 놈: 벡터의 크기가 1일 경우 정규화되었다고(normalized) 하며 이 때 벡터 $\underline{u}$의 크기를 구하는 norm은 $\lVert \underline{u} \rVert _2 = \( \underline{u}^T \underline{u} \)^{\frac{1}{2}} = \sqrt{{u_1}^2 + {u_2}^2 + {u_3}^2}$이다. 이때 해당 놈 방식은 $L^2$ norm, 혹은 유클리디안 거리(Euclidian norm)라고 불리기도 한다. 이때, $L^p$ norm에 대해 $\lVert \underline{r} \rVert _p = \( 
\sum_{i=1}^n\lvert r_i \rvert^p \)^{\frac{1}{p}}$이다.
- 정규 직교: 두 벡터가 서로 직교하고 정규화되었음을 의미한다.