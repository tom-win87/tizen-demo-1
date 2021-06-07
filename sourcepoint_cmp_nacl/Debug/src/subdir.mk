################################################################################
# Automatically-generated file. Do not edit!
################################################################################

# Add inputs and outputs from these tool invocations to the build variables 
CC_SRCS += \
../src/cmp_module.cc 

OBJS += \
./src/cmp_module.po 


# Each subdirectory must supply rules for building sources it contributes
src/%.po: ../src/%.cc
	@echo 'Building file: $<'
	@echo 'Invoking: NaCl C++ compiler'
	pnacl-clang++ -I"$(NACL_SDK_ROOT)/include" -c -g -o "$@" "$<"
	@echo 'Finished building: $<'
	@echo ' '


