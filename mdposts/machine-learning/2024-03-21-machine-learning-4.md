---
title: "Machine Learning 정리 노트 4"
subtitle: "Gradient Descent for Least Squares"
date: "2024-03-21"
use-math: true
---

# [Machine Learning 정리 노트 4] Gradient Descent for Least Squares

## 1. 개요

해당 정리 노트는 경희대학교 이원희 교수님의 "기계학습" 강의를 정리한 노트이다. 기계 학습의 개념은 선형대수에 대한 이해로 시작된다. 따라서 강의 내용을 본인이 이해한 내용을 바탕으로 선형대수의 개념을 풀어 설명하고자 한다.

## 2. 정리 내용

### 2.1 용어 정리

- 경사 하강법(gradient descent): 경사를 구한 뒤 경사의 반대 부호 방향으로 경사를 이동시키며 극값에 이를 때까지 반복하는 알고리즘
- 스텝(step): 경사에 양 또는 음의 부호로 더해지는 값
- 스텝 크기(step size): 스텝의 값의 크기; 이 크기에 따라 경사가 급격히 바뀌어 함수의 지점 이동 크기가 너무 커지거나 너무 적게 바뀌어 함수의 지점 이동 크기가 너무 작아지는 경우가 생기며 적절히 조절하는 것이 중요

### 2.2 경사 하강법(Gradient Descent) 기초

[저번 포스트](https://yoonylim.github.io/posts/machine-learning/2024-03-23-machine-learning-3#2.3%20%EC%B5%9C%EC%86%8C%20%EC%A0%9C%EA%B3%B1%EB%B2%95/%EC%B5%9C%EC%86%8C%20%EC%9E%90%EC%8A%B9%EB%B2%95(Least%20Square%20Method/Least%20Square%20Estimation)%EC%9D%98%20%EC%B5%9C%EC%A0%81%ED%99%94%EC%A0%81%20%EA%B4%80%EC%A0%90)에서 가중치 벡터에 대한 함수에 대해 그래프를 그릴 때 아래로 볼록(covex)한 그래프에서 최소값을 찾기가 더 수월하다는 것을 알고 있다. 이번 포스트에서는 해당 원리를 이용하여 기울기의 경사를 조금씩 조정하며 이동하여 최소값에 이르는 알고리즘인 경사 하강법에 대해 설명한다.

$\underline{\hat{w}}$가 잔차를 최소화하는 가중치 벡터라고 할 때, $\underline{\hat{w}} = \underset{\underline{w}}{\text{argmin}} \lVert \underline{y} - X \underline{w} \rVert^2$는 다시 $\underline{\hat{w}} = (X^T X)^{-1} X^T \underline{y}$임을 이전 두 개의 포스트에서 각각 기학학적 관점과 최적화 관점으로 다루었다. 그러나 이때의 문제점은 특성 행렬 $X$가 매우 큰 차원을 가지게 되면 $(X^T X)^{-1}$을 구하는 연산은 매우 무거워진다. 이에 따라 경사 하강법을 사용하면 행렬의 역행렬을 구할 필요 없이 $\underline{\hat{w}}$을 반복적인 수행을 통해 구할 수 있다.

![img0](/images/machine-learning/20240321/img0.png)
*출처: 이원희 교수, "Gradient Descent for Least Squares" (기계 학습, 경희대학교, 2024년 3월 21일)*

가중치 벡터에 대한 함수 $f(\underline{w})$는 위 그림을 이용하여 나타낼 수 있다. 만약 현재 지점의 가중치 벡터 $\underline{v}$와 해당 벡터와 최소값의 가중치 벡터 사이에 있는 가중치 벡터 $\underline{w}$에 대해, $f(\underline{w})$가 $\underline{v}$와 $\underline{w}$로 이루어진 직선의 방정식보다 크거나 같으면 아래로 볼록하다는 의미가 된다. 즉, 모든 $\underline{w}$, $\underline{v}$에 대해 $f(\underline{w}) \geq f(\underline{v}) + \nabla f(\underline{v})^T (\underline{w} - \underline{v})$이면 $f(\underline{w})$은 아래로 볼록한 그래프이다. 해당 직선의 방정식은 $\underline{v}$가 상수 $a$, $\underline{w}$가 변수 $x$라고 생각하고 해당 그래프가 $XY$ 그래프 위에 있다고 생각하여 $f(a) + f'(a)(x - a)$와 비슷한 형태의 그래프이다.

그러나 아래와 같은 경우 그래프의 모든 점들이 한 지점에서의 접선보다 위에 있지 않은 경우들이 있다. 이에 따라 우리는 경사 하강법을 사용할 때 전역 최소값을 구하지 못하고 지역 최소값을 구하게 될 수도 있는 주의점이 있다. 이 때문에 경사 이동의 크기를 "적절히" 조정하여 전역 최소값을 반복적인 실험을 통해 알아내는 수밖에 없다.

![img1](/images/machine-learning/20240321/img1.png)

### 2.3 경사 하강법(Gradient Descent) 과정

경사 하강법에서 추측한 초기 가중치 벡터를 $\underline{w}^{(1)}$라 하고 스텝 사이즈를 $\tau$ $(\tau > 0)$라 하자. 이때 다음 가중치 벡터 $\underline{w}^{(k + 1)}$을 구하는 함수는 음의 경사를 가져서 최적의 $\underline{w}$의 값을 찾을 때까지 원래 그래프의 접선을 해당 접선의 기울기 반대 방향으로 이동시키게 된다. 해당 접선이 음의 기울기를 가지면 점차 양의 값을 더하게 되어 0이 되는 곳을 찾아 최소값이 다다르고 양의 기울기를 가지면 점차 음의 값을 더하게 되어 0이 되는 곳을 찾아 최소값을 찾게 된다. 즉, 다음 가중치 벡터 $\underline{w}^{(k + 1)}$을 구하는 함수는 $\underline{w}^{(k + 1)} = \underline{w}^{(k)} - \tau \nabla_{\underline{w}} f(\underline{w}^{(k)})$로 표현된다. 이때 정확한 최소값을 다다르기 힘든 경우가 많기에 기울기가 점차 줄어 최소값 근처에 충분히 가깝기 이르렀는지를 판단하는 값 $\epsilon$이 있다. 따라서 $\lVert \underline{w}^{(k + 1)} - \underline{w}^{(k)} \rVert_2 < \epsilon$여서 충분히 오차가 적어졌을 경우 경사 하강법의 반복을 멈추게 된다.

우리는 최적화점 관점에서 가중치 벡터 $\underline{w}$에 대해 $f(\underline{w}) = \lVert \underline{y} - X \underline{w} \rVert^2 = \underline{y}^T \underline{y} - 2 \underline{w}^T X^T \underline{y} + \underline{w}^T X^T X \underline{w}$임을 알고 있다. 따라서 $f(\underline{w})$를 미분하여 얻는 경사는 $\nabla_\underline{w} f(\underline{w}) = -2X^T \underline{y} + 2X^T X \underline{w}$이고 이를 앞서 구한 다음의 가중치 벡터를 구하는 식에 대입하면 다음과 같이 말할 수 있다.

$$ \underline{w}^{(k + 1)} = \underline{w}^{(k)} - \tau \nabla_\underline{w} f(\underline{w}^{(k)}) $$
$$ = \underline{w}^{(k)} - \tau ( 2X^T X \underline{w}^{(k)} - 2X^T \underline{y} )$$
$$ = \underline{w}^{(k)} - 2 X^T \tau ( X \underline{w}^{(k)} - \underline{y} ) $$

그리고 해당 함수의 반복이 멈추는 조건은 $\lVert \underline{w}^{(k + 1)} - \underline{w}^{(k)} \rVert_2 < \epsilon$이다.

### 2.4 경사 하강법(Gradient Descent) Jupyter Notebook

경사 하강법이 어떻게 Python 코드로 표현될 수 있는지 살펴보도록 한다. Python은 당연히 설치되어 있어야 하며 Jupyter Notebook 환경에서 코드를 실행한다.

#### 2.4.1 사전 준비

아래의 코드로 다음 패키지들을 설치한다.

```python
!pip install numpy matplotlib pandas seaborn plotly
```

#### 2.4.2 경사 하강법 시각적 그래프

1. 아래의 코드로 패키지들을 import한다.

```python
import numpy as np
import numpy.matlib as mat
import numpy.linalg as la
import matplotlib.pyplot as plt
%matplotlib inline
```

2. numpy를 이용하여 랜덤한 스칼라 값들을 포함하는 $50 \times 1$의 행렬 $X$를 생성한다. 그리고 가중치 벡터 $w$를 스칼라 값 0.7을 갖는 행렬로 생성한다. 이후 레이블 벡터 $y$를 행렬 $X$와 $w$의 곱으로 표현한다.

```python
n = 50
p = 1 #just 1 feature as an example
X = np.matrix(np.random.rand(n, p))
w_true = np.matrix(0.7) #optimal weight value = 0.7
y = X@w_true   
```

3. 이제 $f(\underline{w}) = \lVert \underline{y} - X \underline{w} \rVert^2$임을 사용하여 가중치 벡터에 대한 함수 f를 $L^2$ norm을 사용하여 아래와 같은 코드로 구현하여 그래프 생성 후 표시한다.

```python
N = 200
w = np.reshape(np.matrix(np.linspace(0,1,N)),(p,N)) #reshape w for calculation
f = np.square(la.norm(mat.repmat(y,1,N) - X@w,2,0)) #f(w)

plt.plot(w.T, f, linewidth = 2)
plt.title("Squared error loss for different candidate w")
plt.xlabel('w')
plt.ylabel('f(w)')
plt.ylim([-0.5,8.5])
plt.show()
```

![img2](/images/machine-learning/20240321/img2.png)

4. 첫 가중치 벡터를 무작위로 0.2를 지정하고 해당 지점에서의 법선을 먼저 경사인 gradf_1을 $\nabla_\underline{w} f(\underline{w}) = 2X^T (X \underline{w} - y)$임을 이용하여 구한 다음 지점 위치에서 그려준다.

```python
w_1 = np.matrix(0.2) #w1 = initial guess = 0.2
f_1 = la.norm(y-X@w_1)**2

gradf_1 = 2*X.T@(X@w_1-y)
tangent_1 = f_1 + gradf_1@(w-w_1)

plt.plot(w.T, f, w_1, f_1, '*', w.T, tangent_1.T, linewidth = 2)
plt.title("Squared error loss for different candidate w")
plt.xlabel('w')
plt.ylabel('f(w)')
plt.ylim([-0.5,8.5])
plt.show()
```

![img3](/images/machine-learning/20240321/img3.png)

5. 스텝 사이즈은 tau를 0.02로 설정한 뒤 다음 가중치 벡터 w_2의 지점을 $\underline{w}^{(k + 1)} = \underline{w}^{(k)} \tau 
\nabla_\underline{w}
f(\underline{w}^{(k)})$임을 사용하여 구한다. 해당 지점에서의 경사인 gradf_2도 새로운 놈도 구하여 그려준다.

```python
tau = .02 #step size 
w_2 = w_1 - tau*gradf_1 #w2
f_2 = la.norm(y-X@w_2)**2
gradf_2 = 2*X.T@(X@w_2-y)
tangent_2 = f_2 + gradf_2@(w-w_2)

plt.plot(w.T, f, w_2, f_2, '*', w.T, tangent_2.T, linewidth = 2)
plt.title("Squared error loss for different candidate w")
plt.xlabel('w')
plt.ylabel('f(w)')
plt.ylim([-0.5,8.5])
plt.show()
```

![img4](/images/machine-learning/20240321/img4.png)

6. 똑같이 스텝 사이즈 tau를 0.02로 설정하고 5번을 반복하며 최적의 가중치 벡터를 구하는 코드를 for 문을 통해 구현 후 그래프로 그린다.

```python
tau = .02 #step size
max_iter = 5
w_hat = np.matrix(np.zeros((max_iter+1,1)))
f_hat = np.matrix(np.zeros((max_iter+1,1)))
w_hat[0] = 0.05 
f_hat[0] = la.norm(y-X@w_hat[0])**2

for k in range(max_iter):
    gradf = 2*X.T@(X@w_hat[k]-y)
    w_hat[k+1] = w_hat[k] - tau*gradf
    f_hat[k+1] = la.norm(y-X@w_hat[k+1])**2
    
plt.plot(w.T, f, w_hat, f_hat, '-*', linewidth = 2)
plt.title("Squared error loss for different candidate w")
plt.xlabel('w')
plt.ylabel('f(w)')
plt.ylim([-0.5,8.5])
plt.show()
```
![img5-1](/images/machine-learning/20240321/img5-1.png)

스텝 사이즈를 더 작게 0.001로 잡으면 더 작게 이동하며 다음 가중치 벡터로 이동하는 모습을 볼 수 있다.

![img5-2](/images/machine-learning/20240321/img5-2.png)

#### 2.4.3 경사 하강법의 간단한 수식 표현 및 스텝 사이즈의 중요성

앞선 내용을 종합하자면 현재 가중치 벡터를 $\underline{x}^{(t)}$, 다음 가중치 벡터를 $\underline{x}^{(t + 1)}$이라 하고 스텝 사이즈를 $\alpha$라 하면 다음과 같은 간단한 수식 이 완성된다.

$$ \underline{x}^{(t + 1)} = \underline{x}^{(t)} - \alpha \frac{d}{d\underline{x}} f(\underline{x}) $$

이를 4차 함수로 된 가중치 벡터에 대한 그래프로 실험하기 위해 코드로 나타내면 아래와 같다.

- 경사값 계산 및 배열 반환 함수:

```python
def gradient_descent(df, initial_guess, alpha, n):
    """Performs n steps of gradient descent on df using learning rate alpha starting 
       from initial_guess. Returns a numpy array of all guesses over time."""
    guesses = [initial_guess]
    current_guess = initial_guess
    while len(guesses) < n:
        current_guess = current_guess - alpha * df(current_guess)
        guesses.append(current_guess)
        
    return np.array(guesses)
```

- 4차 함수 값 반환 함수:

```python
def arbitrary(x):
    return (x**4 - 15*x**3 + 80*x**2 - 180*x + 144)/10
```

- 4차 함수를 $x$에 대해 미분한 값 반환 함수:

```python
def derivative_arbitrary(x):
    return (4*x**3 - 45*x**2 + 160*x - 180)/10
```

- 1부터 7까지의 $x$축 범위와 -1에서 3까지의 $y$축 범위에서 100개의 임의의 점을 찍어 그래프를 그리는 함수:

```python
import numpy as np
import matplotlib.pylot as plt

def plot_arbitrary():
    x = np.linspace(1, 7, 100)
    plt.plot(x, arbitrary(x))
    axes = plt.gca()
    axes.set_ylim([-1, 3])
```

이때 알파값, 즉 스텝 사이즈를 다르게 주며 변화를 관찰하기 위해 처음은 스텝 사이즈를 0.6으로 관측하여 20번 경사 하강을 반복하고 결과를 표현한다.

```python
trajectory = gradient_descent(derivative_arbitrary, 1.6, 0.6, 20)
plot_arbitrary()
plt.plot(trajectory, arbitrary(trajectory));
```

![img6-1](/images/machine-learning/20240321/img6-1.png)

비록 지역 최소값에 도달했지만 이는 전역 최소값은 아니다. 그렇지만 스텝 사이즈를 0.9로 늘리면 결과는 아래와 같이 전역 최소값에 도달한다.

![img6-2](/images/machine-learning/20240321/img6-2.png)

그렇지만 만약 스텝 사이즈를 1.8과 같은 값으로 너무 많이 늘리면 아래와 같이 큰 오차를 불러오게 된다.

![img6-3](/images/machine-learning/20240321/img6-3.png)

즉, 경사 하강법을 통해 최적의 가중치 벡터를 찾기 위해서는 "적절한" 스텝 사이즈를 찾는 것이 매우 중요하다.