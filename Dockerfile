FROM node:latest

# expose port for MAGE Server
EXPOSE 3000

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

RUN git clone https://github.com/sofwerx/glo.git
WORKDIR glo
RUN npm install

#RUN curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash - \
#  && apt-get install -y -q nodejs \
#  && apt-get clean \
#  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# install web dependencies
#RUN npm run build
#
#RUN npm install -g forever


# run it!
#CMD npm start

ADD run.sh /glo/run.sh
CMD /glo/run.sh
