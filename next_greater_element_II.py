## NEXT GREATER ELEMENT II

def nextGreaterElements(self, nums):
    ans = [-1] * len(nums)
    stack = []
    for i in range(2 * len(nums)) :
        i = i % len(nums)
        while stack and nums[stack[-1]] < nums[i] :
            ans[stack.pop()] = nums[i]
        stack.append(i)
    return ans
