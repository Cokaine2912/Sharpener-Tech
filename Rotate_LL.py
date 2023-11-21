# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def length(head) :
        temp = head 
        cnt = 0
        while temp :
            cnt += 1
            temp = temp.next
        return cnt 

    def display(head) :
        temp = head
        while temp :
            print(temp.val,"---> ",end="")
            temp = temp.next
        print(None)
 
            

    def rotateRight(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:
        length = Solution.length(head)
        print("Length",length)
        NR = k % length
        temp = head 
        for i in range(length - NR - 1) :
            temp = temp.next
        bring_fwd = temp.next
        Solution.display(bring_fwd)
        temp.next = None
        Solution.display(head)
        curr =  bring_fwd
        while curr.next :
            curr = curr.next
        curr.next = head
        Solution.display(bring_fwd)
    
        return bring_fwd

        
