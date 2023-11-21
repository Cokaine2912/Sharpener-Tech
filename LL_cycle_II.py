# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None

class Solution:
    def detectCycle(self, head: Optional[ListNode]) -> Optional[ListNode]:

        # temp = head
        # all_next = []
        # while temp :
        #     if temp in all_next :
        #         return temp
        #     all_next.append(temp)
        #     temp = temp.next
        # return None
        MP = None
        slow=head
        fast=head
        while slow and fast and fast.next:
            slow=slow.next
            fast=fast.next.next
            if slow==fast:
                MP = slow
                break
        if not MP :
            return None
        x = MP
        y = head  
        while x != y :
            x = x.next
            y = y.next
        return x
      
        
        
