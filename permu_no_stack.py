
# Online Python - IDE, Editor, Compiler, Interpreter

def subs(string) :
    l = len(string) 
    if l == 1 :
        print("Hit base !!")
        return [string]
    ans = []
    # stack = []
    for i in range(l) :
        # stack.append(string[i])
        # print(stack)
        next = string[:i] + string[i + 1 :]
        # print(stack ,"And next is ",next)
        for ele in subs(next):
            ans.append(string[i] + ele)
        # print("New Stack",stack)

    return ans
    
    
        
        
    
    
    
sample = "abc" 
k = 3
ans = subs(sample)
print(ans)
