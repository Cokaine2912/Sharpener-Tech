## VALID PARENTHESIS

class Solution:
    def isValid(self, s: str) -> bool:
        d = {")" : "(","]" : "[","}" : "{"}
        stack = []
        for ele in s :
            if not stack and ele in d :
                return False
    
            if ele not in d :
                stack.append(ele)
            else :
                if d[ele] == stack[-1]:
                    stack.pop()
                else:
                    return False
            
        if stack :
            return False
        else :
            return True
