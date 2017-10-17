#Bikeshare Project
#Data Exploration
#Libraries
#==================================================================
library(ggplot2)
library(grid)
library(tidyr)
library(plyr)
library(dplyr)

#default parameters for exporting plots as PNG
#plotting for presentation (Landscape, 1 plot per page)
pw = 3000 # 10 inches at 300 dpi
ph = 1800 #  6 inches at 300 dpi

#plotting for documents (portait, 8 plots per page)
#pw = 3000 # a3.25 inches at 300 dpi
#ph =  #  2.1667 inches at 300 dpi

pu= "px" 
ps= 12    # point size
pr = 300  # resolution in pixels/inch , 

#IMPORT AND PROCESS DATA TO EXTRACT ADDITIONAL PREDICTORS FROM DATE/TIME STAMP
#========================================================================
data_path = "~/Data-Viz/bikeshare/data/"
image_path = "~/Data-Viz/bikeshare/images/day_"
daily_file = "day.csv"
hourly_file = "hour.csv"

bs.h<-read.csv(paste0(data_path,hourly_file))
bs.d<-read.csv(paste0(data_path,daily_file))

#bsd<-group_by(bs.h,cnt)
#bsd <- summarise(bsd, dteday, sumCount = sum(cnt))


names(bs.h)[]
names(bs.d)[]
head(bs.h)
#  1. Boxplots - Date and Time  3 x 4
#yr boxplot
b1.yr.casual   <-ggplot(bs.d, aes(as.factor(yr), casual)) + geom_boxplot() + coord_cartesian(ylim=c(0,10000))
b1.yr.registered     <-ggplot(bs.d, aes(as.factor(yr), registered)) + geom_boxplot() + coord_cartesian(ylim=c(0,10000))
b1.yr.cnt     <-ggplot(bs.d, aes(as.factor(yr), cnt)) + geom_boxplot() + coord_cartesian(ylim=c(0,10000))
print(b1.yr.cnt)
names(bs.d)
#season boxplot
b1.season.casual      <-ggplot(bs.d, aes(as.factor(season), casual))+ geom_boxplot() + coord_cartesian(ylim=c(0,10000))
b1.season.registered  <-ggplot(bs.d, aes(as.factor(season), registered))+ geom_boxplot() + coord_cartesian(ylim=c(0,10000))
b1.season.cnt       <-ggplot(bs.d, aes(as.factor(season), cnt))+ geom_boxplot() + coord_cartesian(ylim=c(0,10000))

#month boxplot
b1.month.casual       <-ggplot(bs.d, aes(as.factor(mnth), casual))+ geom_boxplot() + coord_cartesian(ylim=c(0,10000))
b1.month.registered   <-ggplot(bs.d, aes(as.factor(mnth), registered))+ geom_boxplot() + coord_cartesian(ylim=c(0,10000))
b1.month.cnt        <-ggplot(bs.d, aes(as.factor(mnth), cnt))+ geom_boxplot() + coord_cartesian(ylim=c(0,10000))

#day of week boxplot
b2.weekday.casual        <-ggplot(bs.d, aes(as.factor(weekday), casual))+ geom_boxplot() + coord_cartesian(ylim=c(0,10000))
b2.weekday.registered      <-ggplot(bs.d, aes(as.factor(weekday), registered))+ geom_boxplot() + coord_cartesian(ylim=c(0,10000))
b2.weekday.cnt         <-ggplot(bs.d, aes(as.factor(weekday), cnt))+ geom_boxplot() + coord_cartesian(ylim=c(0,10000))


#Temporal Factors
#----------------------------------------------------------
png(filename = paste0(image_path,"bs_dx_temporal.png"),
    width=pw, height=ph, units=pu, pointsize=ps, bg = "white",  res = pr, 
    type = c("cairo", "cairo-png", "Xlib", "quartz"))

pushViewport(viewport(layout = grid.layout(3, 3)))
print(b1.yr.casual, vp = viewport(layout.pos.row = 1, layout.pos.col = 1))
print(b1.yr.registered, vp = viewport(layout.pos.row = 2, layout.pos.col = 1))
print(b1.yr.cnt, vp = viewport(layout.pos.row = 3, layout.pos.col = 1))

print(b1.season.casual, vp = viewport(layout.pos.row = 1, layout.pos.col = 2))
print(b1.season.registered, vp = viewport(layout.pos.row = 2, layout.pos.col = 2))
print(b1.season.cnt, vp = viewport(layout.pos.row = 3, layout.pos.col = 2))

print(b1.month.casual, vp = viewport(layout.pos.row = 1, layout.pos.col = 3))
print(b1.month.registered, vp = viewport(layout.pos.row = 2, layout.pos.col = 3))
print(b1.month.cnt, vp = viewport(layout.pos.row = 3, layout.pos.col = 3))


dev.off()


#b1a just month and hr plots
png(filename = paste0(image_path,"bs_dx_mo_weekday_hr.png"),
        width=pw, height=ph, units=pu, pointsize=ps, bg = "white",  res = pr, 
        type = c("cairo", "cairo-png", "Xlib", "quartz"))

pushViewport(viewport(layout = grid.layout(3, 2)))
print(b1.month.casual, vp = viewport(layout.pos.row = 1, layout.pos.col = 1))
print(b1.month.registered, vp = viewport(layout.pos.row = 2, layout.pos.col = 1))
print(b1.month.cnt, vp = viewport(layout.pos.row = 3, layout.pos.col = 1))

print(b2.weekday.casual, vp = viewport(layout.pos.row = 1, layout.pos.col = 2))
print(b2.weekday.registered, vp = viewport(layout.pos.row = 2, layout.pos.col = 2))
print(b2.weekday.cnt, vp = viewport(layout.pos.row = 3, layout.pos.col = 2))

dev.off()


#workingday boxplot
b2.workingday.casual      <-ggplot(bs.d, aes(as.factor(workingday), casual))+ geom_boxplot() + coord_cartesian(ylim=c(0,10000))
b2.workingday.registered  <-ggplot(bs.d, aes(as.factor(workingday), registered))+ geom_boxplot() + coord_cartesian(ylim=c(0,10000))
b2.workingday.cnt       <-ggplot(bs.d, aes(as.factor(workingday), cnt))+ geom_boxplot() + coord_cartesian(ylim=c(0,10000))

#holiday boxplot
b2.holiday.casual      <-ggplot(bs.d, aes(as.factor(holiday), casual))+ geom_boxplot() + coord_cartesian(ylim=c(0,10000))
b2.holiday.registered  <-ggplot(bs.d, aes(as.factor(holiday), registered))+ geom_boxplot() + coord_cartesian(ylim=c(0,10000))
b2.holiday.cnt       <-ggplot(bs.d, aes(as.factor(holiday), cnt))+ geom_boxplot() + coord_cartesian(ylim=c(0,10000))
#weathersit boxplot
b2.weathersit.casual      <-ggplot(bs.d, aes(as.factor(weathersit), casual))+ geom_boxplot() + coord_cartesian(ylim=c(0,10000))
b2.weathersit.registered <-ggplot(bs.d, aes(as.factor(weathersit), registered))+ geom_boxplot() + coord_cartesian(ylim=c(0,10000))
b2.weathersit.cnt       <-ggplot(bs.d, aes(as.factor(weathersit), cnt))+ geom_boxplot() + coord_cartesian(ylim=c(0,10000))

png(filename = paste0(image_path,"bs_dx_weekday working day holiday and weathersit.png"),
    width=pw, height=ph, units=pu, pointsize=ps, bg = "white",  res = pr, 
    type = c("cairo", "cairo-png", "Xlib", "quartz"))

pushViewport(viewport(layout = grid.layout(3, 4)))

print(b2.weekday.casual, vp = viewport(layout.pos.row = 1, layout.pos.col = 1))
print(b2.weekday.registered, vp = viewport(layout.pos.row = 2, layout.pos.col = 1))
print(b2.weekday.cnt, vp = viewport(layout.pos.row = 3, layout.pos.col = 1))

print(b2.workingday.casual, vp = viewport(layout.pos.row = 1, layout.pos.col = 2))
print(b2.workingday.registered, vp = viewport(layout.pos.row = 2, layout.pos.col = 2))
print(b2.workingday.cnt, vp = viewport(layout.pos.row = 3, layout.pos.col = 2))

print(b2.holiday.casual, vp = viewport(layout.pos.row = 1, layout.pos.col = 3))
print(b2.holiday.registered, vp = viewport(layout.pos.row = 2, layout.pos.col = 3))
print(b2.holiday.cnt, vp = viewport(layout.pos.row = 3, layout.pos.col = 3))

print(b2.weathersit.casual, vp = viewport(layout.pos.row = 1, layout.pos.col = 4))
print(b2.weathersit.registered, vp = viewport(layout.pos.row = 2, layout.pos.col = 4))
print(b2.weathersit.cnt, vp = viewport(layout.pos.row = 3, layout.pos.col = 4))
dev.off()


#histogram boxplot
                                      
h1<-ggplot(bs.d, aes(casual))+geom_histogram(binwidth = 10, color="grey",fill="red")+coord_cartesian(xlim=c(0,1000),ylim=c(0,5000))
h2<-ggplot(bs.d, aes(registered))+geom_histogram(binwidth = 10, color="grey",fill="blue")+coord_cartesian(xlim=c(0,1000),ylim=c(0,5000))
h3<-ggplot(bs.d, aes(cnt))+geom_histogram(binwidth = 10, color="grey",fill="purple")+coord_cartesian(xlim=c(0,1000),ylim=c(0,5000))
h4<-ggplot(bs.d, aes(cnt))+geom_histogram(binwidth = 10, color="grey",fill="purple")
h5<-ggplot(bs.d, aes(casual))+geom_histogram(binwidth = 10, color="grey",fill="red")+coord_cartesian(xlim=c(0,375),ylim=c(0,5000))
h6<-ggplot(bs.d, aes(registered))+geom_histogram(binwidth = 10, color="grey",fill="blue")+coord_cartesian(xlim=c(0,900),ylim=c(0,5000))
range(bs.d$casual)
png(filename = paste0(image_path,"scaledHistogram"),  width=3000, height=1000, units=pu, pointsize=ps, bg = "white",  res = pr, 
    type = c("cairo", "cairo-png", "Xlib", "quartz"))
pushViewport(viewport(layout = grid.layout(1, 3)))
print(h1, vp = viewport(layout.pos.row = 1, layout.pos.col = 1))
print(h2, vp = viewport(layout.pos.row = 1, layout.pos.col = 2))
print(h3, vp = viewport(layout.pos.row = 1, layout.pos.col = 3))
dev.off()

png(filename = paste0(image_path,"Scaled Histogram - cnt.png"),
    width = 2100, height = 2100, units = "px", pointsize = 5,
    bg = "white",  res = 300, 
    type = c("cairo", "cairo-png", "Xlib", "quartz"))
pushViewport(viewport(layout = grid.layout(1, 1)))
print(h4, vp = viewport(layout.pos.row = 1, layout.pos.col = 1))
dev.off()

png(filename = paste0(image_path,"Scaled Histogram - cnt 1500 x 1500.png"),
    width = 1500, height = 1500, units = "px", pointsize = 5,
    bg = "white",  res = 300, 
    type = c("cairo", "cairo-png", "Xlib", "quartz"))
pushViewport(viewport(layout = grid.layout(1, 1)))
print(h4, vp = viewport(layout.pos.row = 1, layout.pos.col = 1))
dev.off()

png(filename = paste0(image_path,"Scaled Histogram - Casual & Registered.png"),
    width = 2100, height = 2100, units = "px", pointsize = 5,
    bg = "white",  res = 300, 
    type = c("cairo", "cairo-png", "Xlib", "quartz"))
pushViewport(viewport(layout = grid.layout(1, 2)))
print(h5, vp = viewport(layout.pos.row = 1, layout.pos.col = 1))
print(h6, vp = viewport(layout.pos.row = 1, layout.pos.col = 2))
dev.off()

png(filename = paste0(image_path,"Scaled Histogram - Casual & Registered 1500 x 1500.png"),
    width = 1500, height = 1500, units = "px", pointsize = 5,
    bg = "white",  res = 300, 
    type = c("cairo", "cairo-png", "Xlib", "quartz"))
pushViewport(viewport(layout = grid.layout(1, 2)))
print(h5, vp = viewport(layout.pos.row = 1, layout.pos.col = 1))
print(h6, vp = viewport(layout.pos.row = 1, layout.pos.col = 2))
dev.off()

#3. Scatter plot of weather parameters versus casual, registered, and cnt
#atemp

s3.atemp.casual       <-ggplot(bs.d, aes(atemp, casual)) + geom_point(color="green",alpha=0.05)+coord_cartesian(ylim=c(0,10000))
s3.atemp.casual
s3.atemp.registered   <-ggplot(bs.d, aes(atemp, registered)) + geom_point(color="green",alpha=0.05)+coord_cartesian(ylim=c(0,10000))
s3.atemp.registered                
s3.atemp.cnt        <-ggplot(bs.d, aes(atemp, cnt)) + geom_point(color="green",alpha=0.05)+coord_cartesian(ylim=c(0,10000))
s3.atemp.registered

#temp 
s3.temp.casual       <-ggplot(bs.d, aes(temp,casual)) + geom_point(color="red",alpha=0.05)+coord_cartesian(ylim=c(0,10000))
s3.temp.casual
s3.temp.registered   <-ggplot(bs.d, aes(temp,registered)) + geom_point(color="red",alpha=0.05)+coord_cartesian(ylim=c(0,10000))
s3.temp.registered
s3.temp.cnt        <-ggplot(bs.d, aes(temp, cnt)) + geom_point(color="red",alpha=0.05)+coord_cartesian(ylim=c(0,10000))
s3.temp.cnt
#humidity
s3.hum.casual       <-ggplot(bs.d, aes(hum, casual)) + geom_point(color="blue",alpha=0.05)+coord_cartesian(ylim=c(0,10000))
s3.hum.registered   <-ggplot(bs.d, aes(hum, registered)) + geom_point(color="blue",alpha=0.05)+coord_cartesian(ylim=c(0,10000))
s3.hum.cnt        <-ggplot(bs.d, aes(hum, cnt)) + geom_point(color="blue",alpha=0.05)+coord_cartesian(ylim=c(0,10000))
#windspeed 
s3.windspeed.casual       <-ggplot(bs.d, aes(windspeed,casual)) + geom_point(color="purple",alpha=0.05)+coord_cartesian(ylim=c(0,10000))
s3.windspeed.registered   <-ggplot(bs.d, aes(windspeed,registered)) + geom_point(color="purple",alpha=0.05)+coord_cartesian(ylim=c(0,10000))
s3.windspeed.cnt        <-ggplot(bs.d, aes(windspeed, cnt)) + geom_point(color="purple",alpha=0.05)+coord_cartesian(ylim=c(0,10000))

#3 
png(filename = paste0(image_path,"bs_dx_scatter_atemp_temp_humid_wind.png"),
    width = 3000, height = 1800, units = "px", pointsize = 12,
    bg = "white",  res = 300, 
    type = c("cairo", "cairo-png", "Xlib", "quartz"))
pushViewport(viewport(layout = grid.layout(3, 4)))
print(s3.atemp.casual, vp = viewport(layout.pos.row = 1, layout.pos.col = 1))
print(s3.atemp.registered, vp = viewport(layout.pos.row = 2, layout.pos.col = 1))
print(s3.atemp.cnt, vp = viewport(layout.pos.row = 3, layout.pos.col = 1))
print(s3.temp.casual, vp = viewport(layout.pos.row = 1, layout.pos.col = 2))
print(s3.temp.registered, vp = viewport(layout.pos.row = 2, layout.pos.col = 2))
print(s3.temp.cnt, vp = viewport(layout.pos.row = 3, layout.pos.col = 2))
print(s3.hum.casual, vp = viewport(layout.pos.row = 1, layout.pos.col = 3))
print(s3.hum.registered, vp = viewport(layout.pos.row = 2, layout.pos.col = 3))
print(s3.hum.cnt, vp = viewport(layout.pos.row =3, layout.pos.col = 3))
print(s3.windspeed.casual, vp = viewport(layout.pos.row = 1, layout.pos.col = 4))
print(s3.windspeed.registered, vp = viewport(layout.pos.row = 2, layout.pos.col = 4))
print(s3.windspeed.cnt, vp = viewport(layout.pos.row = 3, layout.pos.col = 4))

dev.off()

#
#Collinearity plots
s5.temp.atemp<-ggplot(bs.d, aes(temp, atemp)) + geom_point(color="green",alpha=0.05)
s5.temp.hum<-ggplot(bs.d, aes(temp,hum)) + geom_point(color="red",alpha=0.05)
s5.temp.weathersit<-ggplot(bs.d, aes(temp, windspeed)) + geom_point(color="orange",alpha=0.05)
s5.temp.season<-ggplot(bs.d, aes(as.factor(weathersit),temp)) + geom_boxplot(color="darkgoldenrod",alpha=0.05)
s5.temp.month<-ggplot(bs.d, aes(as.factor(mnth),temp)) + geom_boxplot(color="blue",alpha=0.05)
s5.temp.weekday<-ggplot(bs.d, aes(as.factor(weekday), temp)) + geom_boxplot(color="purple",alpha=0.05)

png(filename = paste0(image_path,"bs_dx_collinearity_temp_atemp_humid_wind_weathersit_mo_hr.png"),
    width = 3000, height = 1800, units = "px", pointsize = 12,
    bg = "white",  res = 300, 
    type = c("cairo", "cairo-png", "Xlib", "quartz"))
pushViewport(viewport(layout = grid.layout(2, 3)))
print(s5.temp.atemp, vp = viewport(layout.pos.row = 2, layout.pos.col = 1))
print(s5.temp.hum, vp = viewport(layout.pos.row = 1, layout.pos.col = 2))
print(s5.temp.weathersit, vp = viewport(layout.pos.row = 1, layout.pos.col = 3))
print(s5.temp.season, vp = viewport(layout.pos.row = 1, layout.pos.col = 1))
print(s5.temp.month, vp = viewport(layout.pos.row = 2, layout.pos.col = 2))
print(s5.temp.weekday, vp = viewport(layout.pos.row = 2, layout.pos.col = 3))
dev.off()

names(bs.d)


s7.h<-ggplot(bs.d, aes(hum,casual)) + geom_point(color="blue",alpha=0.1)+coord_cartesian(ylim=c(0,10000))
s8.h<-ggplot(bs.d, aes(hum,registered)) + geom_point(color="blue",alpha=0.1)+coord_cartesian(ylim=c(0,10000))
s9.h<-ggplot(bs.d, aes(hum,cnt)) + geom_point(color="blue",alpha=0.1)+coord_cartesian(ylim=c(0,10000))
s7.h
s8.h
s9.h

s10.h<-ggplot(bs.d, aes(windspeed,casual)) + geom_point(color="purple",alpha=0.1)
s11.h<-ggplot(bs.d, aes(windspeed,registered)) + geom_point(color="purple",alpha=0.1)
s12.h<-ggplot(bs.d, aes(windspeed,cnt)) + geom_point(color="purple",alpha=0.1)
s10.h
s11.h
s12.h

#Summary3 for Hourly Data
#pushViewport(viewport(layout = grid.layout(3, 5)))
png(filename = paste0(image_path,"bs_dx_scatter temp humid wind.png"),
    width = 3000, height = 1800, units = "px", pointsize = 12,
    bg = "white",  res = 300, 
    type = c("cairo", "cairo-png", "Xlib", "quartz"))
pushViewport(viewport(layout = grid.layout(3, 2)))
print(s10.h, vp = viewport(layout.pos.row = 1, layout.pos.col = 1))
print(s11.h, vp = viewport(layout.pos.row = 2, layout.pos.col = 1))
print(s12.h, vp = viewport(layout.pos.row = 3, layout.pos.col = 1))


print(s7.h, vp = viewport(layout.pos.row = 1, layout.pos.col = 2))
print(s8.h, vp = viewport(layout.pos.row = 2, layout.pos.col = 2))
print(s9.h, vp = viewport(layout.pos.row = 3, layout.pos.col = 2))

#Summary for Hourly Data
pushViewport(viewport(layout = grid.layout(3, 5)))
print(b1.h, vp = viewport(layout.pos.row = 1, layout.pos.col = 1))
print(b2.h, vp = viewport(layout.pos.row = 2, layout.pos.col = 1))
print(b3.h, vp = viewport(layout.pos.row = 3, layout.pos.col = 1))

print(b13.h, vp = viewport(layout.pos.row = 1, layout.pos.col = 2))
print(b14.h, vp = viewport(layout.pos.row = 2, layout.pos.col = 2))
print(b15.h, vp = viewport(layout.pos.row = 3, layout.pos.col = 2))

print(b10.h, vp = viewport(layout.pos.row = 1, layout.pos.col = 3))
print(b11.h, vp = viewport(layout.pos.row = 2, layout.pos.col = 3))
print(b12.h, vp = viewport(layout.pos.row = 3, layout.pos.col = 3))

print(b16.h, vp = viewport(layout.pos.row = 1, layout.pos.col = 4))
print(b17.h, vp = viewport(layout.pos.row = 2, layout.pos.col = 4))
print(b18.h, vp = viewport(layout.pos.row = 3, layout.pos.col = 4))

#print tod boxplot
print(tod2, vp = viewport(layout.pos.row = 1, layout.pos.col = 5))
print(tod3, vp = viewport(layout.pos.row = 2, layout.pos.col = 5))
print(tod1, vp = viewport(layout.pos.row = 3, layout.pos.col = 5))

#Summary2 for Hourly Data
pushViewport(viewport(layout = grid.layout(3, 4)))
print(b1.h, vp = viewport(layout.pos.row = 1, layout.pos.col = 1))
print(b2.h, vp = viewport(layout.pos.row = 2, layout.pos.col = 1))
print(b3.h, vp = viewport(layout.pos.row = 3, layout.pos.col = 1))

print(b13.h, vp = viewport(layout.pos.row = 1, layout.pos.col = 2))
print(b14.h, vp = viewport(layout.pos.row = 2, layout.pos.col = 2))
print(b15.h, vp = viewport(layout.pos.row = 3, layout.pos.col = 2))

print(b16.h, vp = viewport(layout.pos.row = 1, layout.pos.col = 3))
print(b17.h, vp = viewport(layout.pos.row = 2, layout.pos.col = 3))
print(b18.h, vp = viewport(layout.pos.row = 3, layout.pos.col = 3))

#print tod boxplot
print(tod2, vp = viewport(layout.pos.row = 1, layout.pos.col = 4))
print(tod3, vp = viewport(layout.pos.row = 2, layout.pos.col = 4))
print(tod1, vp = viewport(layout.pos.row = 3, layout.pos.col = 4))





pushViewport(viewport(layout = grid.layout(3, 2)))
print(b1.h, vp = viewport(layout.pos.row = 1, layout.pos.col = 1))
print(b2.h, vp = viewport(layout.pos.row = 2, layout.pos.col = 1))
print(b3.h, vp = viewport(layout.pos.row = 3, layout.pos.col = 1))
print(b4.h, vp = viewport(layout.pos.row = 1, layout.pos.col = 2))
print(b5.h, vp = viewport(layout.pos.row = 2, layout.pos.col = 2))
print(b6.h, vp = viewport(layout.pos.row = 3, layout.pos.col = 2))



pushViewport(viewport(layout = grid.layout(3, 2)))
print(b7.h, vp = viewport(layout.pos.row = 1, layout.pos.col = 1))
print(b8.h, vp = viewport(layout.pos.row = 2, layout.pos.col = 1))
print(b9.h, vp = viewport(layout.pos.row = 3, layout.pos.col = 1))


pushViewport(viewport(layout = grid.layout(3, 2)))
print(b13.h, vp = viewport(layout.pos.row = 1, layout.pos.col = 1))
print(b14.h, vp = viewport(layout.pos.row = 2, layout.pos.col = 1))
print(b15.h, vp = viewport(layout.pos.row = 3, layout.pos.col = 1))
print(b10.h, vp = viewport(layout.pos.row = 1, layout.pos.col = 2))
print(b11.h, vp = viewport(layout.pos.row = 2, layout.pos.col = 2))
print(b12.h, vp = viewport(layout.pos.row = 3, layout.pos.col = 2))



pushViewport(viewport(layout = grid.layout(3, 1)))
print(b16.h, vp = viewport(layout.pos.row = 1, layout.pos.col = 1))
print(b17.h, vp = viewport(layout.pos.row = 2, layout.pos.col = 1))
print(b18.h, vp = viewport(layout.pos.row = 3, layout.pos.col = 1))


pushViewport(viewport(layout = grid.layout(3, 1)))
print(h2, vp = viewport(layout.pos.row = 1, layout.pos.col = 1))
print(h3, vp = viewport(layout.pos.row = 2, layout.pos.col = 1))
print(h1, vp = viewport(layout.pos.row = 3, layout.pos.col = 1))



sum(bs.d$cnt)*(1/50)*142.5




