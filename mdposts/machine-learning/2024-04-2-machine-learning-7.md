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