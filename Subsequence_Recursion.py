def ss(string) :
    ans = []
    if len(string) == 1 :
        return string 
    for i in range(len(string)) :
        ans.append(string[i])
        next = string[i + 1 :]
        for k in ss(next) :
            ans.append(string[i] + k)
    return ans
            
sample = "ABCD"
ans = ss(sample)
print(ans)
            
