# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
        ans = ListNode(0)
        curr = ans
        if not list1 :
            return list2
        elif not list2 :
            return list1

        while list1 and list2 : 
            f1 = list1.val
            f2 = list2.val
            if f1 < f2 :
                curr.next = ListNode(f1)
                curr = curr.next
                list1 = list1.next
                # print(ans)
            else :
                curr.next = ListNode(f2)
                curr = curr.next
                list2 = list2.next
                # print(ans)
            if list1 :
                curr.next = list1
            elif list2 :
                curr.next = list2
        return ans.next

