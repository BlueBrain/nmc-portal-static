# BASE_URL='/public/alpha.simulationapp/dist/' npm run build
# http://simulation-launcher-mooc-bsp-epfl.apps.hbp.eu 

S3_FOLDER="/Users/antonel/Documents/repos/s3cli"
pushd $S3_FOLDER
source venv3/bin/activate
popd

${S3_FOLDER}/s3cli upload_folder \
  nmc-portal-static \
  -f $(pwd)
