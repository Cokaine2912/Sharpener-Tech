## MIN STACK

class MinStack:

    def __init__(self):
        self.st = []
        self.m = []
        self.t = -1

    def push(self, val: int) -> None:
        if self.t == -1 :
            self.mini = val
        else :
            if val < self.mini :
                self.mini = val
        self.m.append(self.mini)
        self.st.append(val)
        self.t += 1

    def pop(self) -> None:
        self.t = self.t - 1
        self.m.pop()
        if self.m :
            self.mini = self.m[-1]
        self.st.pop()


    def top(self) -> int:
        return self.st[-1]


    def getMin(self) -> int:
        return self.m[-1]
