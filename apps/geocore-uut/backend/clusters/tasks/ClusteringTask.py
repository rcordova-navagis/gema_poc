class ClusteringTask:
    def __init__(self, params):
        self.params = params

    def start(self):
        print("start clustering task")
        print(self.params)