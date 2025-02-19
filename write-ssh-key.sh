#!/bin/bash

# Create the .ssh directory if it doesn't exist
mkdir -p /root/.ssh

# Write the SSH key to the file
echo "$SSH_PRIVATE_KEY" > /root/.ssh/vercel

chmod 600 /root/.ssh/vercel
