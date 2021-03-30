#!/usr/local/bin/python3

import s3fs
import os

fs = s3fs.S3FileSystem(
    key='S3_KEY',
    secret='S3_SECRET',
    use_ssl=True,
    client_kwargs={
        'endpoint_url': 'https://bbpobjectstorage.epfl.ch'
    },
)

# r = fs.ls('nmc-portal-static/nmc-portal')
# [print(x) for x in r]

# origin = '/gpfs/bbp.cscs.ch/project/proj30/home/courcol/nmc-data'
# destination = 'nmc-portal-static/nmc-portal/assets/documents/static'
# origin = '/Users/antonel/Documents/repos/temp/mooc-grading-service-antonel/single_cell_mooc_client'
origin = '/Users/antonel/Desktop/nmc-portal'
destination = 'nmc-portal-static/nmc-portal'

folders_to_skip = [
    ".git",
    ".DS_Store",
    ".ipynb_checkpoints",
    "assets",
    "microcircuit_files",
    "widget",
    # "pathway",
    # "mtype",
    # "metype",
    # "synaptome",
    # "layer",
]

def change_type(full_destination):
    if full_destination.endswith('.html'):
        fs.setxattr(full_destination, {'ContentType': 'text/html'})
        return
    if full_destination.endswith('.css'):
        fs.setxattr(full_destination, {'ContentType': 'text/css'})
        return
    if full_destination.endswith('.js'):
        fs.setxattr(full_destination, {'ContentType': 'application/javascript'})
        return
    if full_destination.endswith('.jpg'):
        fs.setxattr(full_destination, {'ContentType': 'image/jpeg'})
        return
    else:
        return


def put_file(full_origin, full_destination):
    full_destination = full_destination.replace('//', '/')
    print(f'- {full_destination}')
    fs.put(full_origin, full_destination)
    change_type(full_destination)


def upload_folder(folder_name):
    full_folder_path = f'{origin}/{folder_name}'
    for root, directories, filenames in os.walk(full_folder_path):
        if any(x in root for x in folders_to_skip):
            # print(f'skipping folder: {root}')
            continue

        for filename in filenames:
            # print(f'filename: {filename}')
            # print(f'root: {root}')
            if 'downloads.html' != filename:
                continue

            full_origin = f'{root}/{filename}'
            full_destination_folder = root.replace(origin, destination)
            full_destination = f'{full_destination_folder}/{filename}'

            # Add only new files
            # try:
            #     fs.exists(full_destination)
            #     continue
            # except:
            #     put_file(full_origin, full_destination)

            put_file(full_origin, full_destination)



folders_in_dir = os.listdir(origin)
# for folder in folders_in_dir:
#     if not os.path.isdir(f'{origin}/{folder}'):
#         continue
#     print('-------------------------------')
#     print(folder)
#     print('-------------------------------')
#     upload_folder(folder)

# Upload root files
upload_folder('')


print('done')

# def convert_content_type():
#     r = fs.ls('nmc-portal-static/nmc-portal')
#     htmls = [x for x in r if x.endswith('.html')]
#     for html in htmls:
#         fs.setxattr(html, {'ContentType': 'text/html'})

# convert_content_type()

# print(fs.ls('nmc-portal-static/nmc-portal'))

