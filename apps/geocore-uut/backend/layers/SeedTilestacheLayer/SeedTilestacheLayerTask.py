from celery import task
from libs.geocore_tileserver_utils import TilestacheUtils, TilestacheSeeder


class SeedTilestacheLayerTask:
    @task(bind=True)
    def get_task(self, options):
        return TilestacheSeeder(options).start_seed()
