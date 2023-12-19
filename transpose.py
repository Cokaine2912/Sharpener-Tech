
# Online Python - IDE, Editor, Compiler, Interpreter

def transpose(matrix) :
    print(matrix)
    for i in range(len(matrix)) :
        for j in range(len(matrix[i])) :
            if i == j :
                pass 
            elif i < j :
                matrix[i][j],matrix[j][i] = matrix[j][i], matrix[i][j] 
    return matrix 
    
sample = [[1,2,3],[4,5,6],[7,8,9]]
ans = transpose(sample)

print(ans)
