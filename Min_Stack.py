## MIN STACK

class MinStack:

    def __init__(self):
        self.st = []
        self.t = -1
        self.mini = []

    def push(self, val: int) -> None:
        if not self.st :
            self.m = val
        if val < self.m  :
            self.m = val
        self.mini.append(self.m)
        self.t += 1
        self.st.append(val)

    def pop(self) -> bool:
        if self.st :
            self.t = self.t - 1
            self.mini = self.mini[: -1]
            return True
        else:
            return False

    def top(self) -> int :
        if self.st :
            return self.st[self.t]
        else:
            return -1

    def getmin(self) -> int:
        return self.mini[-1]
