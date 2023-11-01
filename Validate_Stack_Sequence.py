## VALIDATE STACK SEQUENCE 

def validateStackSequences(self, pushed, popped) -> bool:
    stack = []
    a,b = pushed,popped
    i = 0
    j = 0
    while i < len(a) and j < len(b) :
        stack.append(a[i])
        i = i + 1
        # print(stack)
        while stack and j < len(b) and stack[-1] == b[j] :
            # print("Inst")
            stack.pop()
            j = j + 1
            # print(stack)
    return False if stack else True

