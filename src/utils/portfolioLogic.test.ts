import test from 'node:test';
import assert from 'node:assert/strict';
import {
  EXPERIENCE,
  PROFILE,
  PROJECTS,
  TECH_STACK,
} from '../data/portfolioData';
import {
  calculateScrollPercent,
  filterTechnologies,
  generateResumeText,
  getProjectsForTechnology,
  projectPoint3D,
  resolveAssetPath,
  rotatePoint3D,
  validateContactForm,
} from './portfolioLogic';

test('filterTechnologies returns all items for "all" and scoped items per category', () => {
  const all = filterTechnologies(TECH_STACK, 'all');
  assert.equal(all.length, TECH_STACK.length);

  const aiItems = filterTechnologies(TECH_STACK, 'ai');
  assert.equal(aiItems.length, 6);
  assert.ok(aiItems.every((item) => item.category === 'ai'));
  assert.ok(aiItems.some((item) => item.name === 'Microsoft Copilot Studio'));
  assert.ok(aiItems.some((item) => item.name === 'Claude Projects'));

  const automationItems = filterTechnologies(TECH_STACK, 'automation');
  assert.equal(automationItems.length, 3);
});

test('getProjectsForTechnology cross-references featured projects accurately', () => {
  const copilotProjects = getProjectsForTechnology(
    PROJECTS,
    'Microsoft Copilot Studio',
  );
  assert.equal(copilotProjects.length, 1);
  assert.equal(copilotProjects[0].id, 'ai-agents-enterprise-automation');

  const azureProjects = getProjectsForTechnology(PROJECTS, 'microsoft azure');
  assert.equal(azureProjects.length, 2);

  const emptyResult = getProjectsForTechnology(PROJECTS, '   ');
  assert.equal(emptyResult.length, 0);
});

test('validateContactForm rejects empty or invalid inputs and accepts valid submissions', () => {
  const emptyResult = validateContactForm({
    name: '',
    email: '',
    topic: 'Role Opportunity',
    message: '',
  });
  assert.equal(emptyResult.isValid, false);
  assert.ok(emptyResult.errors.name);
  assert.ok(emptyResult.errors.email);
  assert.ok(emptyResult.errors.message);

  const badEmail = validateContactForm({
    name: 'Alex Rivera',
    email: 'not-an-email',
    topic: 'Consulting',
    message: 'Interested in collaborating on a cloud modernization project.',
  });
  assert.equal(badEmail.isValid, false);
  assert.equal(badEmail.errors.name, undefined);
  assert.ok(badEmail.errors.email);
  assert.equal(badEmail.errors.message, undefined);

  const valid = validateContactForm({
    name: 'Alex Rivera',
    email: 'alex@company.com',
    topic: 'AI Agents',
    message: 'Would love to discuss an enterprise Copilot Studio agent initiative.',
  });
  assert.equal(valid.isValid, true);
  assert.deepEqual(valid.errors, {});
});

test('generateResumeText includes all supplied identity, experience, and project facts', () => {
  const resume = generateResumeText(PROFILE, EXPERIENCE, PROJECTS, TECH_STACK);
  assert.ok(resume.includes('ABHIMANTRA SINGH RATHORE'));
  assert.ok(resume.includes('Email: abhimantrarathore1@gmail.com'));
  assert.ok(resume.includes('LinkedIn: https://linkedin.com/in/abhimantrasinghrathore'));
  assert.equal(resume.includes('GitHub:'), false);
  assert.ok(resume.includes('TECH MAHINDRA ALLYIS'));
  assert.ok(resume.includes('INSIGHT'));
  assert.ok(resume.includes('Enterprise Application Modernization'));
  assert.ok(resume.includes('Improved performance by 35%'));
  assert.ok(resume.includes('Microsoft Copilot Studio'));
});

test('3D rotation and perspective projection preserve vector radius and foreshortening', () => {
  const origin = { x: 1, y: 0, z: 0 };
  const rotated = rotatePoint3D(origin, 0, Math.PI / 2);
  assert.ok(Math.abs(rotated.x) < 1e-6);
  assert.ok(Math.abs(rotated.z + 1) < 1e-6);

  const near = projectPoint3D({ x: 1, y: 0, z: -1 }, 400, 4, 200, 200);
  const far = projectPoint3D({ x: 1, y: 0, z: 1 }, 400, 4, 200, 200);
  assert.ok(near.scale > far.scale);
  assert.ok(near.x > far.x);
});

test('calculateScrollPercent clamps normalized ratios cleanly to 0-100', () => {
  assert.equal(calculateScrollPercent(0), 0);
  assert.equal(calculateScrollPercent(0.5), 50);
  assert.equal(calculateScrollPercent(1), 100);
  assert.equal(calculateScrollPercent(-0.2), 0);
  assert.equal(calculateScrollPercent(1.4), 100);
  assert.equal(calculateScrollPercent(Number.NaN), 0);
});

test('resolveAssetPath handles root domains, GitHub Pages subpaths, and external URLs', () => {
  assert.equal(
    resolveAssetPath('/src/assets/images/demo.jpg', '/'),
    '/src/assets/images/demo.jpg',
  );
  assert.equal(
    resolveAssetPath('/src/assets/images/demo.jpg', '/portfolio/'),
    '/portfolio/src/assets/images/demo.jpg',
  );
  assert.equal(
    resolveAssetPath('/src/assets/images/demo.jpg', '/portfolio'),
    '/portfolio/src/assets/images/demo.jpg',
  );
  assert.equal(
    resolveAssetPath('https://cdn.example.com/a.jpg', '/portfolio/'),
    'https://cdn.example.com/a.jpg',
  );
});
