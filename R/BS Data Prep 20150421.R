#DS502 Project
#Prepare file for analysis
#Versions
#20150408   Created separate file with code for data import, feature extraction and export
#20150416   Replaced Month and a Day of Week with dummy variables for each month and day of week (p=12->p=29)
#20150421   Replace Season with dummy variable for Summer, Winter, etc (p=29->p=32)

#==================================================================
#Libraries
#==================================================================
library(ggplot2)
library(grid)
library(tidyr)



#========================================================================
#IMPORT AND PROCESS DATA TO EXTRACT ADDITIONAL PREDICTORS FROM DATE/TIME STAMP
#========================================================================
#Import data from test and training sets 
#-------------------------------------------------------------------------------
bs.h <- read.csv("~/Dropbox/DS502 Bike Share Project/data/train.csv")
bs.h.test <- read.csv("~/Dropbox/DS502 Bike Share Project/data/test.csv")

bs.h <-  data.frame(bs.h)
bs.h.test <-  data.frame(bs.h.test)

#-------------------------------------------------------------------------------
#Extract additional features from datetime field
#-------------------------------------------------------------------------------
#create dow =(day of week) variable(1=7): 1=Monday, 7=Sunday
bs.h$dow <- strftime(as.Date(bs.h$datetime),format="%u")
bs.h$dow <- as.numeric(bs.h$dow)
bs.h.test$dow <- strftime(as.Date(bs.h.test$datetime),format="%u")
bs.h.test$dow <- as.numeric(bs.h.test$dow)

#Create separate yr, mo, day, hr, min, sec variables from date and time stamp
bs.h <-separate(bs.h, datetime, c("yr","mo","day", "hr","min","sec"), convert = TRUE, extra="drop")
bs.h.test <-separate(bs.h.test, datetime, c("yr","mo","day", "hr","min","sec"), convert = TRUE, extra="drop")
#Remove day, min and sec columns
bs.h <- bs.h[ -c(3, 5, 6) ]
bs.h.test <- bs.h.test[ -c(3, 5, 6) ]

#convert Day of Week to Dummy Variables
day_M=rep("No",nrow(bs.h))
day_T=rep("No",nrow(bs.h))
day_W=rep("No",nrow(bs.h))
day_R=rep("No",nrow(bs.h))
day_F=rep("No",nrow(bs.h))
day_Sa=rep("No",nrow(bs.h))
day_Su=rep("No",nrow(bs.h))

day_M[bs.h$dow > 0 & bs.h$dow < 2]="Yes"  
day_T[bs.h$dow > 1 & bs.h$dow < 3]="Yes"  
day_W[bs.h$dow > 2 & bs.h$dow < 4]="Yes"
day_R[bs.h$dow > 3 & bs.h$dow < 5]="Yes"
day_F[bs.h$dow > 4 & bs.h$dow < 6]="Yes"
day_Sa[bs.h$dow > 5 & bs.h$dow < 7]="Yes"
day_Su[bs.h$dow > 6 & bs.h$dow < 8]="Yes"

day_M=as.factor(day_M)
day_T=as.factor(day_T)
day_W=as.factor(day_W)
day_R=as.factor(day_R)
day_F=as.factor(day_F)
day_Sa=as.factor(day_Sa)
day_Su=as.factor(day_Su)

bs.h=data.frame(bs.h, day_M, day_T, day_W, day_R, day_F, day_Sa, day_Su)

#convert Season to Dummy Variables
season_sprn=rep("No",nrow(bs.h))
season_smmr=rep("No",nrow(bs.h))
season_fall=rep("No",nrow(bs.h))
season_wntr=rep("No",nrow(bs.h))


season_sprn[bs.h$season > 0 & bs.h$season < 2]="Yes"  
season_smmr[bs.h$season > 1 & bs.h$season < 3]="Yes"  
season_fall[bs.h$season > 2 & bs.h$season < 4]="Yes"
season_wntr[bs.h$season > 3 & bs.h$season < 5]="Yes"

season_sprn=as.factor(season_sprn)
season_smmr=as.factor(season_smmr)
season_fall=as.factor(season_fall)
season_wntr=as.factor(season_wntr)


bs.h=data.frame(bs.h, season_sprn, season_smmr, season_fall, season_wntr)

head(bs.h)
tail(bs.h)

#Month as dummy variable
mo_Jan=rep("No",nrow(bs.h))
mo_Feb=rep("No",nrow(bs.h))
mo_Mar=rep("No",nrow(bs.h))
mo_Apr=rep("No",nrow(bs.h))
mo_May=rep("No",nrow(bs.h))
mo_Jun=rep("No",nrow(bs.h))
mo_Jul=rep("No",nrow(bs.h))
mo_Aug=rep("No",nrow(bs.h))
mo_Sep=rep("No",nrow(bs.h))
mo_Oct=rep("No",nrow(bs.h))
mo_Nov=rep("No",nrow(bs.h))
mo_Dec=rep("No",nrow(bs.h))

mo_Jan[bs.h$mo > 0 & bs.h$mo < 2]="Yes"  
mo_Feb[bs.h$mo > 1 & bs.h$mo < 3]="Yes"  
mo_Mar[bs.h$mo > 2 & bs.h$mo < 4]="Yes"
mo_Apr[bs.h$mo > 3 & bs.h$mo < 5]="Yes"
mo_May[bs.h$mo > 4 & bs.h$mo < 6]="Yes"
mo_Jun[bs.h$mo > 5 & bs.h$mo < 7]="Yes"
mo_Jul[bs.h$mo > 6 & bs.h$mo < 8]="Yes"
mo_Aug[bs.h$mo > 7 & bs.h$mo < 9]="Yes"  
mo_Sep[bs.h$mo > 8 & bs.h$mo < 10]="Yes"
mo_Oct[bs.h$mo > 9 & bs.h$mo < 11]="Yes"
mo_Nov[bs.h$mo > 10 & bs.h$mo < 12]="Yes"
mo_Dec[bs.h$mo > 11 & bs.h$mo < 13]="Yes"


mo_Jan=as.factor(mo_Jan)
mo_Feb=as.factor(mo_Feb)
mo_Mar=as.factor(mo_Mar)
mo_Apr=as.factor(mo_Apr)
mo_May=as.factor(mo_May)
mo_Jun=as.factor(mo_Jun)
mo_Jul=as.factor(mo_Jul)
mo_Aug=as.factor(mo_Aug)
mo_Sep=as.factor(mo_Sep)
mo_Oct=as.factor(mo_Oct)
mo_Nov=as.factor(mo_Nov)
mo_Dec=as.factor(mo_Dec)

bs.h=data.frame(bs.h, mo_Jan, mo_Feb, mo_Mar, mo_Apr, 
                mo_May, mo_Jun, mo_Jul, mo_Aug, mo_Sep, 
                mo_Oct, mo_Nov, mo_Dec)

#Convert Day of Week to dummy variables in Test Set
test.day_M=rep("No",nrow(bs.h.test))
test.day_T=rep("No",nrow(bs.h.test))
test.day_W=rep("No",nrow(bs.h.test))
test.day_R=rep("No",nrow(bs.h.test))
test.day_F=rep("No",nrow(bs.h.test))
test.day_Sa=rep("No",nrow(bs.h.test))
test.day_Su=rep("No",nrow(bs.h.test))

test.day_M[bs.h.test$dow > 0 & bs.h.test$dow < 2]="Yes"  
test.day_T[bs.h.test$dow > 1 & bs.h.test$dow < 3]="Yes"  
test.day_W[bs.h.test$dow > 2 & bs.h.test$dow < 4]="Yes"
test.day_R[bs.h.test$dow > 3 & bs.h.test$dow < 5]="Yes"
test.day_F[bs.h.test$dow > 4 & bs.h.test$dow < 6]="Yes"
test.day_Sa[bs.h.test$dow > 5 & bs.h.test$dow < 7]="Yes"
test.day_Su[bs.h.test$dow > 6 & bs.h.test$dow < 8]="Yes"

test.day_M=as.factor(test.day_M)
test.day_T=as.factor(test.day_T)
test.day_W=as.factor(test.day_W)
test.day_R=as.factor(test.day_R)
test.day_F=as.factor(test.day_F)
test.day_Sa=as.factor(test.day_Sa)
test.day_Su=as.factor(test.day_Su)

bs.h.test=data.frame(bs.h.test, test.day_M, test.day_T, test.day_W, 
                     test.day_R, test.day_F, test.day_Sa, test.day_Su)

#convert Season to Dummy Variables in test data set
test.season_sprn=rep("No",nrow(bs.h.test))
test.season_smmr=rep("No",nrow(bs.h.test))
test.season_fall=rep("No",nrow(bs.h.test))
test.season_wntr=rep("No",nrow(bs.h.test))


test.season_sprn[bs.h.test$season > 0 & bs.h.test$season < 2]="Yes"  
test.season_smmr[bs.h.test$season > 1 & bs.h.test$season < 3]="Yes"  
test.season_fall[bs.h.test$season > 2 & bs.h.test$season < 4]="Yes"
test.season_wntr[bs.h.test$season > 3 & bs.h.test$season < 5]="Yes"

test.season_sprn=as.factor(test.season_sprn)
test.season_smmr=as.factor(test.season_smmr)
test.season_fall=as.factor(test.season_fall)
test.season_wntr=as.factor(test.season_wntr)


bs.h.test=data.frame(bs.h.test, test.season_sprn, test.season_smmr, test.season_fall, test.season_wntr)

#Month as dummy variable
test.mo_Jan=rep("No",nrow(bs.h.test))
test.mo_Feb=rep("No",nrow(bs.h.test))
test.mo_Mar=rep("No",nrow(bs.h.test))
test.mo_Apr=rep("No",nrow(bs.h.test))
test.mo_May=rep("No",nrow(bs.h.test))
test.mo_Jun=rep("No",nrow(bs.h.test))
test.mo_Jul=rep("No",nrow(bs.h.test))
test.mo_Aug=rep("No",nrow(bs.h.test))
test.mo_Sep=rep("No",nrow(bs.h.test))
test.mo_Oct=rep("No",nrow(bs.h.test))
test.mo_Nov=rep("No",nrow(bs.h.test))
test.mo_Dec=rep("No",nrow(bs.h.test))

test.mo_Jan[bs.h.test$mo > 0 & bs.h.test$mo < 2]="Yes"  
test.mo_Feb[bs.h.test$mo > 1 & bs.h.test$mo < 3]="Yes"  
test.mo_Mar[bs.h.test$mo > 2 & bs.h.test$mo < 4]="Yes"
test.mo_Apr[bs.h.test$mo > 3 & bs.h.test$mo < 5]="Yes"
test.mo_May[bs.h.test$mo > 4 & bs.h.test$mo < 6]="Yes"
test.mo_Jun[bs.h.test$mo > 5 & bs.h.test$mo < 7]="Yes"
test.mo_Jul[bs.h.test$mo > 6 & bs.h.test$mo < 8]="Yes"
test.mo_Aug[bs.h.test$mo > 7 & bs.h.test$mo < 9]="Yes"  
test.mo_Sep[bs.h.test$mo > 8 & bs.h.test$mo < 10]="Yes"
test.mo_Oct[bs.h.test$mo > 9 & bs.h.test$mo < 11]="Yes"
test.mo_Nov[bs.h.test$mo > 10 & bs.h.test$mo < 12]="Yes"
test.mo_Dec[bs.h.test$mo > 11 & bs.h.test$mo < 13]="Yes"


test.mo_Jan=as.factor(test.mo_Jan)
test.mo_Feb=as.factor(test.mo_Feb)
test.mo_Mar=as.factor(test.mo_Mar)
test.mo_Apr=as.factor(test.mo_Apr)
test.mo_May=as.factor(test.mo_May)
test.mo_Jun=as.factor(test.mo_Jun)
test.mo_Jul=as.factor(test.mo_Jul)
test.mo_Aug=as.factor(test.mo_Aug)
test.mo_Sep=as.factor(test.mo_Sep)
test.mo_Oct=as.factor(test.mo_Oct)
test.mo_Nov=as.factor(test.mo_Nov)
test.mo_Dec=as.factor(test.mo_Dec)

bs.h.test=data.frame(bs.h.test, test.mo_Jan, test.mo_Feb, test.mo_Mar, test.mo_Apr, 
                test.mo_May, test.mo_Jun, test.mo_Jul, test.mo_Aug, test.mo_Sep, 
                test.mo_Oct, test.mo_Nov, test.mo_Dec)
head(bs.h.test)
tail(bs.h.test)

names(bs.h)
bs.h$dow<- NULL
bs.h.test$dow<- NULL

names(bs.h)
bs.h$mo <- NULL
bs.h.test$mo <- NULL
names(bs.h)
bs.h$season <- NULL
bs.h.test$season <- NULL

#========================================================================
#CREATE SEPARATE DATA SETS FOR COUNT, REGISTERED and CASUAL MODELS
#========================================================================
#count data set - remove casual and registered
bs.h.count<-bs.h
bs.h.count$casual <- NULL
bs.h.count$registered <- NULL
names(bs.h.count)
#registered data set - remove count and casual
bs.h.registered<-bs.h
bs.h.registered$casual <- NULL
bs.h.registered$count <- NULL
names(bs.h.registered)

#casual data set - remove count and registered
bs.h.casual<-bs.h
bs.h.casual$registered<-NULL
bs.h.casual$count <- NULL
names(bs.h.casual)

#Write files to CSV in shared dropbox folder
write.csv(bs.h, "~/Dropbox/DS502 Bike Share Project/data/bsh3.csv", row.names = FALSE)
write.csv(bs.h.test,"~/Dropbox/DS502 Bike Share Project/data/bsh3_test.csv", row.names = FALSE)

write.csv(bs.h.count,"~/Dropbox/DS502 Bike Share Project/data/bsh3_cnt.csv", row.names = FALSE)
write.csv(bs.h.casual,"~/Dropbox/DS502 Bike Share Project/data/bsh3_cas.csv", row.names = FALSE)
write.csv(bs.h.registered,"~/Dropbox/DS502 Bike Share Project/data/bsh3_reg.csv", row.names = FALSE)

#--------------------------------------------------------------------
# Read and verify files
#--------------------------------------------------------------------
df1<-read.csv("~/Dropbox/DS502 Bike Share Project/data/bsh3.csv")
df2<-read.csv("~/Dropbox/DS502 Bike Share Project/data/bsh3_test.csv")

df3<-read.csv("~/Dropbox/DS502 Bike Share Project/data/bsh3_cnt.csv")
df5<-read.csv("~/Dropbox/DS502 Bike Share Project/data/bsh3_cas.csv")
df7<-read.csv("~/Dropbox/DS502 Bike Share Project/data/bsh3_reg.csv")

df1=data.frame(df1)
df2=data.frame(df2)
df3=data.frame(df3)
df5=data.frame(df5)
df7=data.frame(df7)




all.equal(bs.h,df1)
all.equal(bs.h.test,df2)
all.equal(bs.h.count,df3)
all.equal(bs.h.casual,df5)
all.equal(bs.h.registered,df7)

