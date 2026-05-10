
biometria<-data.frame(nomes=c("Carlos", "Roberto", "Olivio", "Joel"),
                      altura=c(180, 187, 155, 168),
                      peso=c(80, 90, 98, 64))
esportes<-data.frame(nomes=c("Carlos", "Roberto", "Olivio", "Jomar"),
                     esportes=c("futebol", "remo", "sumo", "maratona"))

unido<-merge(biometria, esportes, by="nomes")   