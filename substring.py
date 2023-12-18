
# Online Python - IDE, Editor, Compiler, Interpreter

def subs(string) :
    l = len(string) 
    if l == 1 :
        return [string]
    ans = []
    for i in range(l) :
        ans.append(string[i])
        next = string[i + 1 :]
        print("Next",next)
        for ele in subs(next) :
            ans.append(string[i] + ele)
    return ans
    
    
        
        

    
sample = "abc"
ans = subs(sample)
print(ans)
