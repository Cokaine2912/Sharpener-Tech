## DECODE STRING

def decodeString(self, s: str) -> str:
    stack = []
    for i in range(len(s)) :
        if s[i] != "]"  :
            stack.append(s[i])
        else :
            piece = ""
            while stack[-1] != "[":
                piece = stack.pop() + piece
            stack.pop()
            times = ""
            while stack and stack[-1].isnumeric() :
                times = stack[-1] + times
                stack.pop()
            stack.append(int(times) * piece)
    return "".join(stack)




# class Solution:
#     def decodeString(self, s: str) -> str:
#         stack = []
#         for ele in s :
#             if ele != "]" :
#                 stack.append(ele)
#             else :
#                 piece = ""
#                 while stack[-1] != "[" :
#                     piece = stack.pop() + piece
#                 stack.pop()
#                 num = ""
#                 while stack and stack[-1].isnumeric() :
#                     num = stack.pop() + num
#                 stack.append(int(num) * piece)
#         return "".join(stack)
# 
# 
# 
# 
# 
# 
# 
# sample = "3[ab2[xy]]"
# obj = Solution()
# ans = obj.decodeString(sample)
# print(ans)
# 

