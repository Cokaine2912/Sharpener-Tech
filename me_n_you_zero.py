def sum_subarray_zero(nums) :
    d = {}
    rs = [nums[0]]
    for i in range(1 , len(nums)) :
        s = rs[-1] + nums[i]
        rs.append(s)
        if s in d :
            return True
        else :
            d[s] = i

    return False
        
