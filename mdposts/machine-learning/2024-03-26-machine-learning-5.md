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

부분 공간 $\mathcal{S}$에 속하는 두 벡터 $\underline{x}$와 $\underline{y}$가 있다고 하자.

### 2.3 투영(Projection)

