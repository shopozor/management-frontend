TARGET_PATH="~/www/www.softozor.ch/shopozor/management-frontend/"
ssh michella@softozor.ch "cd $TARGET_PATH; rm -Rf *"
scp -r specification/* michella@softozor.ch:$TARGET_PATH
