from clusters.tasks.ClusteringTask import ClusteringTask


AFTER_ACTIONS = {
    'warm_tilestache': ClusteringTask,
    'do_cluster': ClusteringTask
}


class ActionResolver:
    def __init__(self, actions):
        self.actions = []
        for item in actions:
            self.actions.append({
                'ActionObj': AFTER_ACTIONS[item['action']](item['params']),
                'action': item['action'],
                'params': item['params']
            })

    def run_actions(self):
        print(self.actions)
        for action in self.actions:
            action['ActionObj'].start()
