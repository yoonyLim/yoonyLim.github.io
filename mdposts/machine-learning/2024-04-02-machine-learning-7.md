---
title: "Machine Learning 정리 노트 7"
subtitle: "Singular Value Decomposition in Machine Learning"
date: "2024-04-02"
use-math: true
---

# [Machine Learning 정리 노트 7] Singular Value Decomposition in Machine Learning

## 1. 개요

해당 정리 노트는 경희대학교 이원희 교수님의 "기계학습" 강의를 정리한 노트이다. 기계 학습의 개념은 선형대수에 대한 이해로 시작된다. 따라서 강의 내용을 본인이 이해한 내용을 바탕으로 선형대수의 개념을 풀어 설명하고자 한다.

## 2. 정리 내용

### 2.1 용어 정리

- 차원 축소(dimensionality reduction): 행렬의 선형 종속이거나 불필요한 벡터를 제외시킨 뒤 변환을 통해 저차원 부분 공간으로 표현하는 기법
- 의사 역행렬(pseudo inverse matrix): 가역 혹은 불가역인 일반적인 행렬에 대해 역행렬의 특징을 가지는 행렬

### 2.1 특이값 분해의 효율성

[이전 포스트](https://yoonylim.github.io/posts/machine-learning/2024-03-28-machine-learning-6)에서 소개했듯 특이값 분해의 목적은 같은 정보를 적은 연산으로 처리하여 기계학습 모델을 생성하는 것이다. 이에 따라 특이값 분해는 어떻게 효율적으로 작동하는지 살펴보고자 한다. 먼저 복습하자면 $X = U \Sigma V^T$의 특이값 분해에서 특이값을 지니는 대각 행렬 $\Sigma$의 모양은 행렬 $X$의 차원에 따라 다음과 같다:

행렬 $\Sigma$에 대해 보다 자세히 살펴보면 아래와 같이 특성 행렬 $X \in \mathbb{R}^{n \times p}$에 대해 $n$과 $p$의 대소 관계에 따라 성분의 모습이 달라진다.

- $n = p$일 때:

$$ \Sigma = \begin{bmatrix} \sigma_1 & 0 & \dots & 0 \\\\ 0 & \sigma_2 & \dots & 0 \\\\ \vdots & \vdots & \ddots & \vdots \\\\ 0 & 0 & \dots & \sigma_n \end{bmatrix} $$

- $n > p$일 때 ($p$개 만큼 특이값이 존재하는 행과 $n-p$개 만큼 0으로 채워진 행들):

$$ \Sigma = \begin{bmatrix} \sigma_1 & 0 & \dots & 0 \\\\ 0 & \sigma_2 & \dots & 0 \\\\ \vdots & \vdots & \ddots & \vdots \\\\ 0 & 0 & \dots & \sigma_p \\\\ 0 & 0 & \dots & 0 \\\\ \vdots & \vdots & \ddots & \vdots \\\\ 0 & 0 & \dots & 0 \end{bmatrix} $$

- $n < p$일 때 ($n$개 만큼 특이값이 존재하는 열과 $p-n$개 만큼 0으로 채워진 열들):

$$ \Sigma = \begin{bmatrix} \sigma_1 & 0 & \dots & 0 & 0 & \dots & 0 \\\\ 0 & \sigma_2 & \dots & 0 & 0 & \dots & 0 \\\\ \vdots & \vdots & \ddots & \vdots & \vdots & \ddots & \vdots \\\\ 0 & 0 & \dots & \sigma_n & 0 & \dots & 0 \end{bmatrix} $$

즉, 0으로 채워진 부분과 곱해지는 $V$ 행렬의 일부는 0이 되며 차원이 축소된다. 이때 대각 행렬 $\Sigma$의 특이값의 개수($\sigma_i$의 개수)는 특성 행렬 $X$의 랭크와 같다. 그리고 $X = U \Sigma V^T$이니 행렬 $X$는 랭크가 1인 행렬들의 합으로 $X = \sum
_{i = 1}
^{r = \text{min} (n, p)}
\sigma_i u_i v_i^T$와 같이 표현이 가능하다. 대각 행렬 $\Sigma$의 0으로 채워진 부분과 곱해지는 부분을 제외하면 훨씬 작은 차원의 새로운 행렬의 표현 
$X = \tilde{U} \tilde{\Sigma} \tilde{V}^T$로 표현할 수 있으며 이를 시각화하면 아래와 같다.

![img0](/images/machine-learning/20240402/img0.png)

위와 같은 특징으로 인해 실제 예시를 들어보면 매우 효율적인 연산을 위한 특성 행렬 $X$의 차원 축소를 이룰 수 있다. 비약적인 예시일 수 있으나 만약 한 인터넷 쇼핑몰에서 $n$개의 물품들과 이를 사가는 $p$명의 고객들의 정보가 특성 행렬로 존재한다고 하자. 그리고 십만 개의 물품들과 백만 명의 고객들에 대한 데이터가 존재한다고 하고 각 특성값은 데이터 값으로서 정수값을 지녀 4 bytes의 크기라고 하자. 그렇다면 전체 데이터의 저장 용량은 100,000 $\times$ 1,000,000 $\times$ 4 bytes가 되어 대략 400 GB의 데이터가 존재한다고 할 수 있다.<br>
그러나 만약 특성 행렬 $X$의 랭크가 10이여서 $\tilde{U} \in \mathbb{R}^{100000 \times 10}$, $\tilde{\Sigma} \in \mathbb{R}^{10 \times 10}$, $\tilde{V}^T \in \mathbb{R}^{10 \times 1000000}$라 하면 같은 데이터가 $\tilde{U}$ = 100000 $\times$ 10 $\times$ 4 bytes $\approx$ 4 MB, $\tilde{\Sigma}$ = 10 $\times$ 4 bytes = 40 bytes, $\tilde{V}^T$ = 1000000 $\times$ 10 $\times$ 4 bytes $\approx$ 40 MB 로 매우 적은 양으로도 같은 정보를 담을 수 있다.

### 2.3 차원 축소된 벡터 구하기

그렇다면 우리는 특성 행렬 $X$의 행벡터들 $x_1, x_2, \dots, x_p \in \mathbb{R}^p$에 대해 차원 축소된 벡터들$z_1, z_2, \dots, z_n \in \mathbb{R}^k \quad (k < p)$를 어떻게 구할 수 있을까? 알다시피 특성값 분해를 사용하여 구할 수 있다. 수업 때의 예시를 그대로 이용하여 살펴보자.

아래와 같이 랭크가 2인 행렬 $X$이 존재한다고 하자.

$$ X = \begin{bmatrix} 1 & -1 & -1 & 1 \\\\ -1 & 1 & -1 & 1 \\\\ 1 & -1 & -1 & 1 \\\\ -1 & 1 & -1 & 1 \\\\ 1 & -1 & 0 & 0 \end{bmatrix} $$

그렇다면 다음과 같이 특이값 분해가 가능하다. 이때 행렬 $U$는 행렬 $X$의 첫번째와 네번째 열벡터를 기저로 하여 만들어진 직교 행렬이다. 만약 특이값 분해를 위해 고유값을 구하는 등의 자세한 과정을 원한다면 Roshan Joe Vincent의 ["Singular Value Decomposiont(SVD) - Working Example"](https://medium.com/intuition/singular-value-decomposition-svd-working-example-c2b6135673b5)을 추천한다.

$$ X = \begin{bmatrix} \frac{1}{\sqrt{5}} & \frac{1}{2} \\\\ -\frac{1}{\sqrt{5}} & \frac{1}{2} \\\\ \frac{1}{\sqrt{5}} & \frac{1}{2} \\\\ -\frac{1}{\sqrt{5}} & \frac{1}{2} \\\\ \frac{1}{\sqrt{5}} & 0 \end{bmatrix} \begin{bmatrix} \sqrt{5} \sqrt{2} & 0 \\\\ 0 & 2 \sqrt{2} \end{bmatrix} \begin{bmatrix} \frac{1}{\sqrt{2}} & -\frac{1}{\sqrt{2}} & 0 & 0 \\\\ 0 & 0 & -\frac{1}{\sqrt{2}} & \frac{1}{\sqrt{2}} \end{bmatrix} = \tilde{U} \tilde{\Sigma} \tilde{V}^T $$

***참고: 한 행렬 $A$의 특이값 분해는 유일하지 않다***

이때 우리가 구하고자 하는 차원 축소된 벡터들은 행렬 $X$의 행벡터들에 대한 것이므로 $X^T$를 사용하여 아래와 같이 표현할 수 있다.

$$ X^T = \begin{bmatrix} \vdots & \vdots & \vdots & \vdots & \vdots \\\\ \underline{x_1} & \underline{x_2} & \underline{x_3} & \underline{x_4} & \underline{x_5} \\\\ \vdots & \vdots & \vdots & \vdots & \vdots \end{bmatrix} = \tilde{V} \tilde{\Sigma}^T \tilde{U}^T $$
$$ = \frac{1}{\sqrt{2}} \begin{bmatrix} 1 & 0 \\\\ -1 & 0 \\\\ 0 & -1 \\\\ 0 & 1 \end{bmatrix} \sqrt{2} \begin{bmatrix} 1 & -1 & 1 & -1 & 1 \\\\ 1 & 1 & 1 & 1 & 0 \end{bmatrix} $$

즉, $\underline{x_i}$는 왼쪽 특이 벡터들의 가중합이며 결국 중요한 차원 축소된 $\underline{z_i}$는 오른쪽 특이 벡터들로 표현이 가능하다.

$$ \underline{x_1} = \begin{bmatrix} 1 \\\\ -1 \\\\ -1 \\\\ 1 \end{bmatrix} \rightarrow \underline{z_1} = \sqrt{2} \begin{bmatrix} 1 \\\\ 1 \end{bmatrix}, 
\quad \underline{x_2} = \begin{bmatrix} -1 \\\\ 1 \\\\ -1 \\\\ 1 \end{bmatrix} \rightarrow \underline{z_2} = \sqrt{2} \begin{bmatrix} -1 \\\\ 1 \end{bmatrix}, 
\quad \underline{x_3} = \begin{bmatrix} 1 \\\\ -1 \\\\ -1 \\\\ 1 \end{bmatrix} \rightarrow \underline{z_2} = \sqrt{2} \begin{bmatrix} 1 \\\\ 1 \end{bmatrix}, 
\quad \underline{x_4} = \begin{bmatrix} -1 \\\\ 1 \\\\ -1 \\\\ 1 \end{bmatrix} \rightarrow \underline{z_2} = \sqrt{2} \begin{bmatrix} -1 \\\\ 1 \end{bmatrix}, 
\quad \underline{x_5} = \begin{bmatrix} 1 \\\\ -1 \\\\ 0 \\\\ 0 \end{bmatrix} \rightarrow \underline{z_2} = \sqrt{2} \begin{bmatrix} 1 \\\\ 0 \end{bmatrix} $$

### 2.4 의사 역행렬(Pseudo Inverse Matrix)

우리는 normal equation을 사용하여 $\underline{\hat{w}} = (X^T X)^{-1} X^T \underline{y}$라는 것을 알고 있다. 이때 $X = U \Sigma V^T$라는 것을 이용하면 아래와 같은 수식을 이끌어낼 수 있다.

$$ (X^T X)^{-1} X^T = (V \Sigma^T U^T U \Sigma V^T)^{-1} V \Sigma^T U^T $$
$$ = (V \Sigma^T \Sigma V^T)^{-1} V \Sigma^T U^T $$
$$ = (V^T)^{-1} (V \Sigma^T \Sigma)^{-1} V \Sigma^T U^T $$
$$ = (V^{-1})^{-1} (V \Sigma^T \Sigma)^{-1} V \Sigma^T U^T \qquad \because V^T V = I \rightarrow V^T = V^{-1}$$
$$ = (V^{-1})^{-1} (\Sigma^T \Sigma)^{-1} V^{-1} V \Sigma^T U^T $$
$$ = V (\Sigma^T \Sigma)^{-1} \Sigma^T U^T $$

위 수식에서 $(\Sigma^T \Sigma)^{-1} \Sigma^T$은 의사 역행렬이며 정방 행렬이 아닌 행렬에 대해서도 일부 역행렬의 특징을 지닌다. 이대 의사 역행렬은 $\Sigma^+$로 표현한다.

***참고: 한 행렬 $A$의 의사 역행렬은 유일하다***
***주의: 모든 역행렬은 의상 역행렬이지만 모든 의사 역행렬이 역행렬은 아니다(정방 행렬이 아닌 행렬은 역행렬을 가지지 않으므로)***

정방 행렬이거나 정방 행렬이 아닌 행렬 $R$과 해당 행렬의 의사 역행렬 $Q$에 대해 몇가지 특징은 아래와 같다:

- $RQR = R$
- $QRQ = Q$
- $(RQ)^T = RQ$
- $(QR)^T = QR$ 

위 수식에서 $(\Sigma^T \Sigma)^{-1} \Sigma^T$에 대해 $n \geq p$일 때의 $\Sigma^+$의 표현은 다음과 같다:

$$ (\Sigma^T \Sigma)^{-1} \Sigma^T = \Sigma^+ = \begin{bmatrix} \frac{1}{\sigma_1} & \dots & 0 & 0 & \dots & 0 \\\\ \vdots & \ddots & \vdots & \vdots & \ddots & \vdots \\\\ 0 & \dots & \frac{1}{\sigma_p} & 0 & \dots & 0 \end{bmatrix} $$

마지막으로 최소 제곱법에서 구한 normal equation에 대입하자면 아래와 같은 수식이 완성된다.

$$ \underline{\hat{w}} \approx V \Sigma^+ U^T \underline{y} $$

특이값 분해와 의사 역행렬 이용의 장점으로는 다음과 같다:

- 차원 축소를 통해 연산을 줄일 수 있음
- 의사 역행렬은 역행렬이 존재하지 않는 행렬에 대해서도 효율적 연산을 가능케 함