#!/bin/bash

# req.sh
for((i=1;i<=4;i++)); do   
  curl http://127.0.0.1:8000
  echo ""
done 
