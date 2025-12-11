# Elixir Taiwan Website Build Commands

# Build CSS and Hugo site for production
build:
	npm run build:css
	hugo --gc --minify

# Clean generated files
clean:
	rm -rf public

# Start development server with CSS watching
server:
	npm run build:css
	hugo server --disableFastRender -D

# Watch CSS changes (run in separate terminal)
watch-css:
	npm run dev

# Build CSS only
css:
	npm run build:css

.PHONY: build clean server watch-css css
