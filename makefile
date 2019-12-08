resources = $(patsubst res/%,build/%,$(wildcard res/**))

.PHONY: all
all : build build/script.js $(resources)
	@printf '\n  ###########\n  # SUCCESS #\n  ###########\n\n'

.PHONY: clean
clean :
	@printf '  RM\tbuild\n'
	@rm -rf build
	@printf '  MK\tbuild\n'
	@mkdir build

build :
	@printf '  MKDIR\tbuild\n'
	@mkdir build

build/script.ts : $(wildcard src/*.ts)
	@printf '  RM\tbuild/script.ts\n'
	@rm -f build/script.ts
	@printf '  CAT\t$^\t->\tbuild/script.ts\n'
	@cat $^ >> build/script.ts

build/script.js : build/script.ts build
	@printf '  TSC\t$<\t->\t$@\n'
	@tsc --lib dom,es2015 --sourceMap --outFile $@ $<

build/% : res/% build
	@printf '  CP\t$<\t->\t$@\n'
	@cp $< $@