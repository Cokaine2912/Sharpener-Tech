# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:

        ans = ListNode(0)
        curr = ans
        carry = 0
        while l1 != None and l2 != None :
            x = l1.val 
            y = l2.val
            s = x + y + carry
            if s >= 10 :
                carry = 1
                curr.next = ListNode(s % 10)
                curr = curr.next
            else :
                carry = 0
                curr.next = ListNode(s)
                curr = curr.next
            
            l1 = l1.next
            l2 = l2.next

        b = l1 or l2
        while b :
            s = carry + b.val
            if s >= 10 :
                carry = 1
            else :
                carry = 0
            curr.next = ListNode(s%10)
            curr = curr.next 
            b = b.next
        if carry :
            curr.next = ListNode(carry)

    

        return ans.next

        
