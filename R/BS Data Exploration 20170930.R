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
#pw = 3000 # 10 inches at 300 dpi
#ph = 1800 #  6 inches at 300 dpi

#plotting for documents (portait, 8 plots per page)
pw = 975 # 3.25 inches at 300 dpi
ph = 650 #  2.1667 inches at 300 dpi
pu= "px" 
ps= 12    # point size
pr = 300  # resolution in pixels/inch , 

#IMPORT AND PROCESS DATA TO EXTRACT ADDITIONAL PREDICTORS FROM DATE/TIME STAMP
#========================================================================
data_path = "~/Data-Viz/bikeshare/data/"
image_path = "~/Data-Viz/bikeshare/image/"
daily_file = "day.csv"
hourly_file = "hour.csv"

bs.h<-read.csv(paste0(data_path,hourly_file))
bs.d<-read.csv(paste0(data_path,daily_file))

#bsd<-group_by(bs.h,cnt)
#bsd <- summarise(bsd, dteday, sumCount = sum(cnt))


names(bs.h)[]
names(bs.d)[]
head(bs.h)
ggplot(bs.d, aes(x=bs.h$dteday, y=bs.d$cnt)) + geom_bar(stat = "identity"",color="red", alpha=.25) + coord_cartesian(ylim=c(0,10000))
#ggplot(bs.h, aes(x=bs.h$hr, y=bs.h$cnt)) + geom_point(color="red", alpha=.05) + coord_cartesian(ylim=c(0,1000))
#ggplot(bs.h, aes(x=bs.h$dteday, y=bs.h$cnt)) + geom_line(color="blue") + coord_cartesian(ylim=c(0,1000))

#qplot(y=bs.h$cnt,x=(bs.h.dteday),c)
ggsave(filename=paste0(image_path,"bs_timeseries_plot_rpt.png"),width=6, height=3, units="in")
ggsave(filename=paste0(image_path,"bs_timeseries_plot_ppt.png"),width=10, height=6, units="in")
names(bs.h)
#  1. Boxplots - Date and Time  3 x 4
#yr boxplot
b1.yr.casual   <-ggplot(bs.h, aes(as.factor(yr), casual)) + geom_boxplot() + coord_cartesian(ylim=c(0,1000))
b1.yr.registered     <-ggplot(bs.h, aes(as.factor(yr), registered)) + geom_boxplot() + coord_cartesian(ylim=c(0,1000))
b1.yr.cnt     <-ggplot(bs.h, aes(as.factor(yr), cnt)) + geom_boxplot() + coord_cartesian(ylim=c(0,1000))
print(b1.yr.cnt)
names(bs.h)
#season boxplot
b1.season.casual      <-ggplot(bs.h, aes(as.factor(season), casual))+ geom_boxplot() + coord_cartesian(ylim=c(0,1000))
b1.season.registered  <-ggplot(bs.h, aes(as.factor(season), registered))+ geom_boxplot() + coord_cartesian(ylim=c(0,1000))
b1.season.cnt       <-ggplot(bs.h, aes(as.factor(season), cnt))+ geom_boxplot() + coord_cartesian(ylim=c(0,1000))

#month boxplot
b1.month.casual       <-ggplot(bs.h, aes(as.factor(mo), casual))+ geom_boxplot() + coord_cartesian(ylim=c(0,1000))
b1.month.registered   <-ggplot(bs.h, aes(as.factor(mo), registered))+ geom_boxplot() + coord_cartesian(ylim=c(0,1000))
b1.month.cnt        <-ggplot(bs.h, aes(as.factor(mo), cnt))+ geom_boxplot() + coord_cartesian(ylim=c(0,1000))

#hr boxplot (i.e., time of day)
b1.hr.cnt           <-ggplot(bs.h, aes(as.factor(hr), cnt))+ geom_boxplot() + coord_cartesian(ylim=c(0,1000))
b1.hr.casual          <-ggplot(bs.h, aes(as.factor(hr), casual))+ geom_boxplot() + coord_cartesian(ylim=c(0,1000))
b1.hr.registered      <-ggplot(bs.h, aes(as.factor(hr), registered))+ geom_boxplot() + coord_cartesian(ylim=c(0,1000))

#day of week boxplot
b2.dow.casual        <-ggplot(bs.h, aes(as.factor(dow), casual))+ geom_boxplot() + coord_cartesian(ylim=c(0,1000))
b2.dow.registered      <-ggplot(bs.h, aes(as.factor(dow), registered))+ geom_boxplot() + coord_cartesian(ylim=c(0,1000))
b2.dow.cnt         <-ggplot(bs.h, aes(as.factor(dow), cnt))+ geom_boxplot() + coord_cartesian(ylim=c(0,1000))


#Temporal Factors
#----------------------------------------------------------
png(filename = paste0(image_path,"bs_dx_temporal.png"),
    width=pw, height=ph, units=pu, pointsize=ps, bg = "white",  res = pr, 
    type = c("cairo", "cairo-png", "Xlib", "quartz"))

pushViewport(viewport(layout = grid.layout(3, 4)))
print(b1.yr.casual, vp = viewport(layout.pos.row = 1, layout.pos.col = 1))
print(b1.yr.registered, vp = viewport(layout.pos.row = 2, layout.pos.col = 1))
print(b1.yr.cnt, vp = viewport(layout.pos.row = 3, layout.pos.col = 1))

print(b1.season.casual, vp = viewport(layout.pos.row = 1, layout.pos.col = 2))
print(b1.season.registered, vp = viewport(layout.pos.row = 2, layout.pos.col = 2))
print(b1.season.cnt, vp = viewport(layout.pos.row = 3, layout.pos.col = 2))

print(b1.month.casual, vp = viewport(layout.pos.row = 1, layout.pos.col = 3))
print(b1.month.registered, vp = viewport(layout.pos.row = 2, layout.pos.col = 3))
print(b1.month.cnt, vp = viewport(layout.pos.row = 3, layout.pos.col = 3))

print(b1.hr.casual, vp = viewport(layout.pos.row = 1, layout.pos.col = 4))
print(b1.hr.registered, vp = viewport(layout.pos.row = 2, layout.pos.col = 4))
print(b1.hr.cnt, vp = viewport(layout.pos.row = 3, layout.pos.col = 4))

dev.off()


#b1a just month and hr plots
png(filename = paste0(image_path,"bs_dx_mo_dow_hr.png"),
        width=pw, height=ph, units=pu, pointsize=ps, bg = "white",  res = pr, 
        type = c("cairo", "cairo-png", "Xlib", "quartz"))

pushViewport(viewport(layout = grid.layout(3, 3)))
print(b1.month.casual, vp = viewport(layout.pos.row = 1, layout.pos.col = 1))
print(b1.month.registered, vp = viewport(layout.pos.row = 2, layout.pos.col = 1))
print(b1.month.cnt, vp = viewport(layout.pos.row = 3, layout.pos.col = 1))

print(b2.dow.casual, vp = viewport(layout.pos.row = 1, layout.pos.col = 2))
print(b2.dow.registered, vp = viewport(layout.pos.row = 2, layout.pos.col = 2))
print(b2.dow.cnt, vp = viewport(layout.pos.row = 3, layout.pos.col = 2))

print(b1.hr.casual, vp = viewport(layout.pos.row = 1, layout.pos.col = 3))
print(b1.hr.registered, vp = viewport(layout.pos.row = 2, layout.pos.col = 3))
print(b1.hr.cnt, vp = viewport(layout.pos.row = 3, layout.pos.col = 3))
dev.off()


#workingday boxplot
b2.workingday.casual      <-ggplot(bs.h, aes(as.factor(workingday), casual))+ geom_boxplot() + coord_cartesian(ylim=c(0,1000))
b2.workingday.registered  <-ggplot(bs.h, aes(as.factor(workingday), registered))+ geom_boxplot() + coord_cartesian(ylim=c(0,1000))
b2.workingday.cnt       <-ggplot(bs.h, aes(as.factor(workingday), cnt))+ geom_boxplot() + coord_cartesian(ylim=c(0,1000))

#holiday boxplot
b2.holiday.casual      <-ggplot(bs.h, aes(as.factor(holiday), casual))+ geom_boxplot() + coord_cartesian(ylim=c(0,1000))
b2.holiday.registered  <-ggplot(bs.h, aes(as.factor(holiday), registered))+ geom_boxplot() + coord_cartesian(ylim=c(0,1000))
b2.holiday.cnt       <-ggplot(bs.h, aes(as.factor(holiday), cnt))+ geom_boxplot() + coord_cartesian(ylim=c(0,1000))
#weathersit boxplot
b2.weather.casual      <-ggplot(bs.h, aes(as.factor(weather), casual))+ geom_boxplot() + coord_cartesian(ylim=c(0,1000))
b2.weather.registered <-ggplot(bs.h, aes(as.factor(weather), registered))+ geom_boxplot() + coord_cartesian(ylim=c(0,1000))
b2.weather.cnt       <-ggplot(bs.h, aes(as.factor(weather), cnt))+ geom_boxplot() + coord_cartesian(ylim=c(0,1000))

png(filename = paste0(image_path,"bs_dx_dow working day holiday and weather.png"),
    width=pw, height=ph, units=pu, pointsize=ps, bg = "white",  res = pr, 
    type = c("cairo", "cairo-png", "Xlib", "quartz"))

pushViewport(viewport(layout = grid.layout(3, 4)))

print(b2.dow.casual, vp = viewport(layout.pos.row = 1, layout.pos.col = 1))
print(b2.dow.registered, vp = viewport(layout.pos.row = 2, layout.pos.col = 1))
print(b2.dow.cnt, vp = viewport(layout.pos.row = 3, layout.pos.col = 1))

print(b2.workingday.casual, vp = viewport(layout.pos.row = 1, layout.pos.col = 2))
print(b2.workingday.registered, vp = viewport(layout.pos.row = 2, layout.pos.col = 2))
print(b2.workingday.cnt, vp = viewport(layout.pos.row = 3, layout.pos.col = 2))

print(b2.holiday.casual, vp = viewport(layout.pos.row = 1, layout.pos.col = 3))
print(b2.holiday.registered, vp = viewport(layout.pos.row = 2, layout.pos.col = 3))
print(b2.holiday.cnt, vp = viewport(layout.pos.row = 3, layout.pos.col = 3))

print(b2.weather.casual, vp = viewport(layout.pos.row = 1, layout.pos.col = 4))
print(b2.weather.registered, vp = viewport(layout.pos.row = 2, layout.pos.col = 4))
print(b2.weather.cnt, vp = viewport(layout.pos.row = 3, layout.pos.col = 4))
dev.off()


#histogram boxplot
                                      
h1<-ggplot(bs.h, aes(casual))+geom_histogram(binwidth = 10, color="grey",fill="red")+coord_cartesian(xlim=c(0,1000),ylim=c(0,5000))
h2<-ggplot(bs.h, aes(registered))+geom_histogram(binwidth = 10, color="grey",fill="blue")+coord_cartesian(xlim=c(0,1000),ylim=c(0,5000))
h3<-ggplot(bs.h, aes(cnt))+geom_histogram(binwidth = 10, color="grey",fill="purple")+coord_cartesian(xlim=c(0,1000),ylim=c(0,5000))
h4<-ggplot(bs.h, aes(cnt))+geom_histogram(binwidth = 10, color="grey",fill="purple")
h5<-ggplot(bs.h, aes(casual))+geom_histogram(binwidth = 10, color="grey",fill="red")+coord_cartesian(xlim=c(0,375),ylim=c(0,5000))
h6<-ggplot(bs.h, aes(registered))+geom_histogram(binwidth = 10, color="grey",fill="blue")+coord_cartesian(xlim=c(0,900),ylim=c(0,5000))
range(bs.h$casual)
png(filename = "/Data-Viz/bikeshare/Scaled Histograms.png",
    width=3000, height=1000, units=pu, pointsize=ps, bg = "white",  res = pr, 
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

s3.atemp.casual       <-ggplot(bs.h, aes(atemp, casual)) + geom_point(color="green",alpha=0.05)+coord_cartesian(ylim=c(0,1000))
s3.atemp.casual
s3.atemp.registered   <-ggplot(bs.h, aes(atemp, registered)) + geom_point(color="green",alpha=0.05)+coord_cartesian(ylim=c(0,1000))
s3.atemp.registered                
s3.atemp.cnt        <-ggplot(bs.h, aes(atemp, cnt)) + geom_point(color="green",alpha=0.05)+coord_cartesian(ylim=c(0,1000))
s3.atemp.registered

#temp 
s3.temp.casual       <-ggplot(bs.h, aes(temp,casual)) + geom_point(color="red",alpha=0.05)+coord_cartesian(ylim=c(0,1000))
s3.temp.casual
s3.temp.registered   <-ggplot(bs.h, aes(temp,registered)) + geom_point(color="red",alpha=0.05)+coord_cartesian(ylim=c(0,1000))
s3.temp.registered
s3.temp.cnt        <-ggplot(bs.h, aes(temp, cnt)) + geom_point(color="red",alpha=0.05)+coord_cartesian(ylim=c(0,1000))
s3.temp.cnt
#humidity
s3.hum.casual       <-ggplot(bs.h, aes(hum, casual)) + geom_point(color="blue",alpha=0.05)+coord_cartesian(ylim=c(0,1000))
s3.hum.registered   <-ggplot(bs.h, aes(hum, registered)) + geom_point(color="blue",alpha=0.05)+coord_cartesian(ylim=c(0,1000))
s3.hum.cnt        <-ggplot(bs.h, aes(hum, cnt)) + geom_point(color="blue",alpha=0.05)+coord_cartesian(ylim=c(0,1000))
#windspeed 
s3.windspeed.casual       <-ggplot(bs.h, aes(windspeed,casual)) + geom_point(color="purple",alpha=0.05)+coord_cartesian(ylim=c(0,1000))
s3.windspeed.registered   <-ggplot(bs.h, aes(windspeed,registered)) + geom_point(color="purple",alpha=0.05)+coord_cartesian(ylim=c(0,1000))
s3.windspeed.cnt        <-ggplot(bs.h, aes(windspeed, cnt)) + geom_point(color="purple",alpha=0.05)+coord_cartesian(ylim=c(0,1000))

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
s5.temp.atemp<-ggplot(bs.h, aes(temp, atemp)) + geom_point(color="green",alpha=0.05)
s5.temp.hum<-ggplot(bs.h, aes(temp,hum)) + geom_point(color="red",alpha=0.05)
s5.temp.weather<-ggplot(bs.h, aes(temp, windspeed)) + geom_point(color="orange",alpha=0.05)
s5.temp.season<-ggplot(bs.h, aes(as.factor(weather),temp)) + geom_boxplot(color="darkgoldenrod",alpha=0.05)
s5.temp.month<-ggplot(bs.h, aes(as.factor(mo),temp)) + geom_boxplot(color="blue",alpha=0.05)
s5.temp.dow<-ggplot(bs.h, aes(as.factor(hr), temp)) + geom_boxplot(color="purple",alpha=0.05)

png(filename = paste0(image_path,"bs_dx_collinearity_temp_atemp_humid_wind_weather_mo_hr.png"),
    width = 3000, height = 1800, units = "px", pointsize = 12,
    bg = "white",  res = 300, 
    type = c("cairo", "cairo-png", "Xlib", "quartz"))
pushViewport(viewport(layout = grid.layout(2, 3)))
print(s5.temp.atemp, vp = viewport(layout.pos.row = 2, layout.pos.col = 1))
print(s5.temp.hum, vp = viewport(layout.pos.row = 1, layout.pos.col = 2))
print(s5.temp.weather, vp = viewport(layout.pos.row = 1, layout.pos.col = 3))
print(s5.temp.season, vp = viewport(layout.pos.row = 1, layout.pos.col = 1))
print(s5.temp.month, vp = viewport(layout.pos.row = 2, layout.pos.col = 2))
print(s5.temp.dow, vp = viewport(layout.pos.row = 2, layout.pos.col = 3))
dev.off()

names(bs.h)


s7.h<-ggplot(bs.h, aes(hum,casual)) + geom_point(color="blue",alpha=0.1)+coord_cartesian(ylim=c(0,1000))
s8.h<-ggplot(bs.h, aes(hum,registered)) + geom_point(color="blue",alpha=0.1)+coord_cartesian(ylim=c(0,1000))
s9.h<-ggplot(bs.h, aes(hum,cnt)) + geom_point(color="blue",alpha=0.1)+coord_cartesian(ylim=c(0,1000))
s7.h
s8.h
s9.h

s10.h<-ggplot(bs.h, aes(windspeed,casual)) + geom_point(color="purple",alpha=0.1)
s11.h<-ggplot(bs.h, aes(windspeed,registered)) + geom_point(color="purple",alpha=0.1)
s12.h<-ggplot(bs.h, aes(windspeed,cnt)) + geom_point(color="purple",alpha=0.1)
s10.h
s11.h
s13.h

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



sum(bs.h$cnt)*(1/50)*142.5




