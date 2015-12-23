# # register user

# curl  --form account=myuser15 --form password=myuser15 --form image=@a.png \
# http://localhost:3000/register/user
# echo '\n'

# curl  --data 'account=myuser10&password=myuser10' \
# http://localhost:3000/register/user
# echo '\n'
# # login user

# curl  -c cookie15.file --data 'account=myuser15&password=myuser15' \
# http://localhost:3000/login/user
# echo '\n'


# curl  -c cookie11.file --data 'account=myuser11&password=myuser11' \
# http://localhost:3000/login/user
# echo '\n'

curl  -c cookie48.file --data 'account=14331048&password=036713' \
http://localhost:3000/login/user
echo '\n'

# # register organization

# curl  -b cookie48.file  --data 'account=mygroup48'  \
# http://localhost:3000/register/organization
# echo '\n'

# # setting organization

curl -b cookie48.file --form accessible=true \
http://localhost:3000/settings/user

# curl  -b cookie48.file --form name=group48 --form image=@b.png --form password=123456 \
# http://localhost:3000/settings/organization/mygroup48
# echo '\n'

# #join

# curl -b cookie11.file --data 'password=123456' \
# http://localhost:3000/join/organization/mygroup48
# echo '\n'
# curl -b cookie10.file \
# http://localhost:3000/join/organization/mygroup23
# echo '\n'

#update


# curl -b cookie15.file --data 'name=CCCCCCC&options=[{"_id":"5648bdc8dffeff445992e56e","name":"haha"}]' \
# http://localhost:3000/update/organization/mygroup22/vote/5648bdc8dffeff445992e56b
# echo '\n'

# curl -b cookie15.file --data 'content=aaaaa&name=bbbbb' \
# http://localhost:3000/update/organization/mygroup22/notice/5648a0a5ac94988641239ded
# echo '\n'

# curl -b cookie15.file --data 'name=haha'  \
# http://localhost:3000/update/organization/mygroup22/homework/5648b39e7cd8e4964f9821b3
# echo '\n'

# create
# curl -b cookie15.file --data 'name=cplusplus&content=primer&options=["A","B","C"]' \
# http://localhost:3000/create/organization/mygroup22/vote
# echo '\n'

# curl -b cookie15.file  --data 'name=program&content=program' \
# http://localhost:3000/create/organization/mygroup23/notice
# echo '\n'

#vote
# curl -b cookie15.file --data 'vote_id=5648186941c8e50734ab1ded&option_id=5648186941c8e50734ab1df0' \
# http://localhost:3000/vote/organization/mygroup18
# echo '\n'

# curl -b cookie10.file --data 'vote_id=5648186941c8e50734ab1ded&option_id=5648186941c8e50734ab1def' \
# http://localhost:3000/vote/organization/mygroup18
# echo '\n'

# curl -b cookie11.file --data 'vote_id=5648186941c8e50734ab1ded&option_id=5648186941c8e50734ab1def' \
# http://localhost:3000/vote/organization/mygroup18
# echo '\n'

#delete
# curl -X "DELETE"  -b cookie15.file \
# http://localhost:3000/organization/mygroup18
# echo '\n'

# curl -X "DELETE"  -b cookie15.file \
# http://localhost:3000/organization/mygroup23/member/myuser10
# echo '\n'

#send

# curl -b cookie15.file --data 'content=helloworld' \
# http://localhost:3000/send/myuser11
# echo '\n'

# search

# curl -b cookie15.file \
# http://localhost:3000/search/user/relationships
# echo '\n'

# curl -b cookie15.file \
# http://localhost:3000/search/organization/mygroup23/members
# echo '\n'
# curl -b cookie15.file \
# http://localhost:3000/search/organization/mygroup22/members
# echo '\n'
# curl -b cookie15.file \
# http://localhost:3000/search/organization/mygroup21/members
# echo '\n'
# curl -b cookie15.file \
# http://localhost:3000/search/organization/mygroup20/members
# echo '\n'

# curl -b cookie9.file \
# http://localhost:3000/search/organization/mygroup9/members
# echo '\n'

# curl -b cookie9.file \
# http://localhost:3000/search/organization/mygroup9/members
# echo '\n'

# curl -b cookie11.file \
# http://localhost:3000/search/organization/mygroup22
# echo '\n'

# curl -b cookie15.file \
# http://localhost:3000/search/organization/mygroup18/votes
# echo '\n'
