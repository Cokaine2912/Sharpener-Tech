# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def middle(head) :
        fast = slow = head
        while fast.next and fast.next.next :
            fast = fast.next.next
            slow = slow.next
        return slow

    def display(head) :
        temp = head 
        while temp :
            print(temp.val , "---> ",end="")
            temp = temp.next
        print(None)

    def reverse(head) :
        prev = None
        curr = head 
        while curr :
            aage = curr.next
            curr.next = prev
            prev = curr
            curr = aage
        return prev

    def isPalindrome(self, head: Optional[ListNode]) -> bool:
        Solution.display(head)
        m = Solution.middle(head)
        print("Middle is")
        Solution.display(m)
        last = Solution.reverse(m.next)
        print("Last is")
        Solution.display(last)
        curr = head
        while last != None :
            if last.val != curr.val :
                return False
            last = last.next
            curr = curr.next
        return True


        
