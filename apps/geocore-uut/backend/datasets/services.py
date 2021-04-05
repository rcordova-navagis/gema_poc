from django.db import connection


def link_dataset_queue(dataset_queue_name, dataset_queue_id):
    cursor = connection.cursor()
    update_tbl_query = """
                    ALTER TABLE IF EXISTS {dataset_queue_name} 
                    ADD COLUMN dataset_queue_id INTEGER REFERENCES dataset_queues(id)
                """.format(dataset_queue_name=dataset_queue_name)
    cursor.execute(update_tbl_query)

    add_queue_id_query = """
                UPDATE {dataset_queue_name} 
                SET dataset_queue_id = {id} 
            """.format(dataset_queue_name=dataset_queue_name, id=dataset_queue_id)
    cursor.execute(add_queue_id_query)


def transfer_dataset_queue_data(dataset_id, dataset_queue_name):
    cursor = connection.cursor()

    insert_query = """
                INSERT INTO dataset_data("dataset_id", "row_no", "data_pk", "data", "geom")
                SELECT {dataset_id}, t.ogc_fid, t.ogc_fid, row_to_json(t), t.geom
                FROM (
                    SELECT * FROM {dataset_queue_name}
                ) t
            """.format(dataset_id=dataset_id, dataset_queue_name=dataset_queue_name)
    cursor.execute(insert_query)
