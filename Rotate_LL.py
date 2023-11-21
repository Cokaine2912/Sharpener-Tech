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

    def rotateRight(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:
        length = Solution.length(head)
        if not head :
            return head
        NR = k % length
        if length == 1 :
            return head
        elif NR == 0 :
            return head
        
        temp = head 
        for i in range(length - NR - 1) :
            temp = temp.next
        bring_fwd = temp.next
        temp.next = None
        
        curr =  bring_fwd
        while curr.next :
            curr = curr.next
        curr.next = head
            
        return bring_fwd

################################################################################################################################




# # Definition for singly-linked list.
# # class ListNode:
# #     def __init__(self, val=0, next=None):
# #         self.val = val
# #         self.next = next
# class Solution:
#     def length(head) :
#         temp = head 
#         cnt = 0
#         while temp :
#             cnt += 1
#             temp = temp.next
#         return cnt 

#     def display(head) :
#         temp = head
#         while temp :
#             print(temp.val,"---> ",end="")
#             temp = temp.next
#         print(None)
 
            

#     def rotateRight(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:
#         length = Solution.length(head)
#         print("Length",length)
#         NR = k % length
#         temp = head 
#         for i in range(length - NR - 1) :
#             temp = temp.next
#         bring_fwd = temp.next
#         Solution.display(bring_fwd)
#         temp.next = None
#         Solution.display(head)
#         curr =  bring_fwd
#         while curr.next :
#             curr = curr.next
#         curr.next = head
#         Solution.display(bring_fwd)
    
#         return bring_fwd

        
