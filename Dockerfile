FROM node:8.9.4

# expose port for MAGE Server
EXPOSE 3000

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

# install basics
RUN apt-get -q update && apt-get install -y -qq \
  apt-utils \
  git \
  curl \
  ssh \
  sudo \
  nodejs \
  gcc \
  make \
  build-essential \
  unzip \
  && apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

COPY . /glo

WORKDIR glo

COPY package.json yarn.lock ./
RUN yarn --pure-lockfile

#RUN set -ex; \
#  if [ "$NODE_ENV" = "production" ]; then \
#    yarn install --no-cache --frozen-lockfile --production; \
#  elif [ "$NODE_ENV" = "test" ]; then \
#    yarn install --no-cache --frozen-lockfile; \
#  fi;

#RUN curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash - \
#  && apt-get install -y -q nodejs \
#  && apt-get clean \
#  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# install web dependencies
#RUN npm run build
#
#RUN npm install -g forever

# install web dependencies
RUN yarn run build

# run it!
#CMD npm start

#run it using run.sh
ADD run.sh /glo/run.sh
CMD /glo/run.sh
