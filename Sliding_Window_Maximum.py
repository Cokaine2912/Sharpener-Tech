# SLIDING WINDOW MAXIMUM USING DEQUE

import collections
class Solution:
    def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:
        dq = collections.deque()
        added = 0
        ans = []
        for i in range(len(nums)) :
            ele = nums[i]
            while dq and dq[-1][1] < ele :
                dq.pop()
            if dq and i - dq[0][0] >= k :
                dq.popleft()
            dq.append((i,ele))
            added += 1
            if added == k :
                ans.append(dq[0][1])
                added = k - 1
          
        return ans
