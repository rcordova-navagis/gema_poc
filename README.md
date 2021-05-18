Note: These setup is being tested on a** Ubuntu 20.04.2 LTS**

### Prerequisites

*   Docker ([Install guide here](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04))
*   Docker Compose ([Install guide here](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04))
*   Git ([Install guide here](https://www.digitalocean.com/community/tutorials/how-to-install-git-on-ubuntu-20-04))


### Setup

- Create project dir

  <table>
    <tr>
     <td>
      <p>
  <code>// feel free to put the dir wherever you want</code>
  </p>
  <p>
  <code>sudo mkdir -p /var/www/gema_poc</code>
  </p>
  <p>
  <code>// update folder ownership to your user</code>
  <p>
  <code>sudo chown -R navagis:navagis /var/www/gema_poc </code>
     </td>
    </tr>
  </table>



- Clone project from git


  <table>
    <tr>
     <td>
  <p><code>cd /var/www/</code></p>
  <p><code>git clone https://github.com/wayne-abarquez/gema_poc.git gema_poc</code></p>
     </td>
    </tr>
  </table>

- Setup config files

<table>
  <tr>
   <td>
<p><code>cp /var/www/gema_poc/.env.dev /var/www/gema_poc/.env</code></p>
<p><code>// After copying .env file, edit .env and find DJANGO_ALLOWED_HOSTS and make sure to add your vm ip</code></p>
   </td>
  </tr>
</table>

    
- Start containers


```
cd /var/www/gema_poc
docker-compose up -d 
```


- Verify containers if up and running, you should see the status of each containers


```
docker ps
```


If there are errors on each container, you can check the logs


```
docker logs --tail 50 --follow --timestamps geocore-gql
```


 

Fix permission Issue


```
sudo chmod -R 775 /var/www/gema_poc/**/**/*.sh
sudo chmod -R 775 /var/www/gema_poc/**/**/**/*.sh
sudo chmod -R 775 /var/www/gema_poc/data
```


Fix “exec user process caused: no such file or directory” error


```
// install dos2unix if you havent
sudo apt install -y dos2unix 
 
dos2unix /var/www/gema_poc/**/**/*.sh
dos2unix /var/www/gema_poc/**/**/**/*.sh
```



### After Setting up backend. What i normally do is use my vm as server and do the frontend setup on my windows host machine.

  For **Geocore Visualization** setup



1. Go to gema_poc/frontend
2. Edit .env.frontend, update these values based on your vm’s IP

        API_BASE_URL, GRAPHQL_HOST, TILESTACHE_BASE_URL

3. Issue command “yarn” or ”npm install” to install dependencies
4. Start app “yarn start” or “npm start”

  

  For **Geocore UUT** setup



1. Go to gema_poc/apps/geocore-uut/frontend
2. Edit .env.frontend, update these values based on your vm’s IP

        API_BASE_URL, GRAPHQL_HOST, TILESTACHE_BASE_URL

3. Issue command “yarn” or ”npm install” to install dependencies
4. Start app “yarn start” or “npm start”