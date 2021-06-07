################################################################################
# Automatically-generated file. Do not edit!
################################################################################

-include ../makefile.init

RM := python $(NACL_SDK_ROOT)/tools/oshelpers.py rm

# All of the sources participating in the build are defined here
-include sources.mk
-include src/subdir.mk
-include subdir.mk
-include objects.mk

-include ../makefile.defs

# Add inputs and outputs from these tool invocations to the build variables 
PEXE += \
sourcepoint_cmp_nacl.pexe \

NACL_EXECUTABLE += \
sourcepoint_cmp_nacl_i686.nexe \
sourcepoint_cmp_nacl_x86-64.nexe \
sourcepoint_cmp_nacl_armv7.nexe \


# All Target
all: sourcepoint_cmp_nacl.nmf

# Tool invocations
sourcepoint_cmp_nacl.nmf: $(NACL_EXECUTABLE)
	@echo 'Building target: $@'
	@echo 'Generating manifest file'
	python "$(NACL_SDK_ROOT)/tools/create_nmf.py" -s ./  -o "sourcepoint_cmp_nacl.nmf" $(NACL_EXECUTABLE)
	@echo 'Finished building target: $@'
	@echo ' '

sourcepoint_cmp_nacl.pexe: $(OBJS)
	@echo 'Invoking: NaCl C++ linker'
	pnacl-clang++ -o "sourcepoint_cmp_nacl.pexe" $(OBJS) -L"$(NACL_SDK_ROOT)/lib/pnacl/Debug" -lppapi_cpp -lppapi -lpthread
	@echo 'Finished building: $@'
	@echo ' '

sourcepoint_cmp_nacl_i686.nexe sourcepoint_cmp_nacl_x86-64.nexe sourcepoint_cmp_nacl_armv7.nexe: $(PEXE)
	@echo 'Invoking: NaCl Translator'
	pnacl-translate --allow-llvm-bitcode-input -arch $(patsubst sourcepoint_cmp_nacl_%.nexe,%,$(notdir $@))  -o $@ $(PEXE)
	@echo 'Finished building: $@'
	@echo ' '

# Other Targets
clean:
	-$(RM) $(NACL_EXECUTABLE)$(NACL_MANIFEST_OUTPUTS)$(PEXE)$(OBJS) sourcepoint_cmp_nacl.nmf
	-@echo ' '

.PHONY: all clean dependents

-include ../makefile.targets
