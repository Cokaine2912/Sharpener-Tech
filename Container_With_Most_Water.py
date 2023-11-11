## TWO-POINTER APPROACH

class Solution:
    def maxArea(self, height) -> int:
        i = 0
        j = len(height) - 1
        W = []
        while i < j  :
            left = height[i]
            right = height[j]
            water = min(left,right) * (j - i)
            W.append(water)
            if left < right :
                i += 1
            else :
                j -= 1
        return max(W)
