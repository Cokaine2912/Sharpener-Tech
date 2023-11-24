
def merge(nums) :
  if len(nums) == 1 or not nums :
    return nums
    
  l = len(nums)
  mid = l // 2
  left = nums[:mid]
  right = nums[mid :]
  ans = []
  
  piche = merge(left)
  aage = merge(right)
  
  i = j =  0
  
  while i < len(piche) and j < len(aage) :
    if piche[i] < aage[j] :
      ans.append(piche[i])
     
      i += 1 
    else :
      ans.append(aage[j])
      
      j += 1 
      
  
  while i < len(piche) :
    ans.append(piche[i])
   
    i += 1
    
  while j < len(aage) :
    ans.append(aage[j])
   
    j += 1
    
  return ans
    
    
      
sample = [5,6,7,4,3,2,9,1]
ans = merge(sample)
print(ans)
